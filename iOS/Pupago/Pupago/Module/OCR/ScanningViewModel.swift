//
//  ScanningViewModel.swift
//  Pupago
//
//  Created by 김근수 on 2020/12/10.
//

import RxSwift
import RxCocoa
import VisionKit

final class ScanningViewModel: ViewModel, ViewModelType {
    
    typealias TranslationViewState = (text: String, isHidden: Bool)
    typealias DetailViewState = (text: String, type: Bool)
    
    // MARK: - Input
    
    struct Input {
        let detailText: Observable<String>
        let originDetailDidTap: Observable<Void>
        let translationDetailDidTap: Observable<Void>
        let cancleButtonDidTap: Observable<Void>
        let scanButtonDidTap: Observable<Void>
        let sendButtonDidTap: Observable<Void>
        let closeButtonDidTap: Observable<Void>
    }
    
    // MARK: - Output
    
    struct Output {
        let viewText: Driver<Localize.ScanningViewText>
        let isActive: Observable<Bool>
        let needScanning: Signal<VNDocumentCameraViewController>
        let originText: Observable<String>
        let translationViewState: Observable<TranslationViewState>
        let detailViewState: Driver<DetailViewState>
        let needFade: Observable<Bool>
        let scanedImage: Observable<UIImage>
        let needAnimation: Observable<Bool>
        let dismiss: Signal<Void>
    }
    
    // MARK: - State
    
    private let activate = BehaviorRelay<Bool>(value: false)
    private let scanedImage = PublishRelay<UIImage>()
    private let translationViewState = PublishRelay<TranslationViewState>()
    private let chatInfo = PublishRelay<Translator.Text>()
    private let animating = BehaviorRelay<Bool>(value: false)
    private let originText = PublishRelay<String>()
    private let detailViewState = BehaviorRelay<DetailViewState>(value: ("", false))
    private let needFade = BehaviorRelay<Bool>(value: true)
    
    // MARK: - Transform
    
    func transform(_ input: Input) -> Output {
        let translator = Translator(provider: provider)
        
        originText
            .distinctUntilChanged()
            .debounce(.milliseconds(200), scheduler: MainScheduler.instance)
            .flatMap { translator.translate(with: $0) }
            .subscribe(onNext: { [unowned self] info in
                let translatedText = info.lang == "Korean" ? info.english : info.korean
                chatInfo.accept(info)
                activate.accept(true)
                translationViewState.accept((translatedText, false))
            })
            .disposed(by: rx.disposeBag)
        
        originText
            .distinctUntilChanged()
            .subscribe(onNext: { [unowned self] text in
                let state = text.isEmpty ? ("", true) : (localize.value.userMessage.translating, false)
                translationViewState.accept(state)
                activate.accept(false)
            })
            .disposed(by: rx.disposeBag)
        
        scanedImage
            .flatMap { [unowned self] image -> Observable<OCRResponse> in
                animating.accept(true)
                return provider.ocr(data: image.base64, timestamp: DateManager.currentTimeMillis(), requestId: UUID().uuidString)
            }
            .subscribe(onNext: { [unowned self] result in
                animating.accept(false)
                originText.accept(result.concatedString)
            }, onError: { error in
                print(error)
            })
            .disposed(by: rx.disposeBag)
        
        input.detailText
            .subscribe(onNext: { [unowned self] text in
                detailViewState.value.type ? translationViewState.accept((text, false)) : originText.accept(text)
            })
            .disposed(by: rx.disposeBag)
        
        input.cancleButtonDidTap
            .map { return true }
            .bind(to: needFade, activate)
            .disposed(by: rx.disposeBag)
        
        input.sendButtonDidTap
            .withLatestFrom(chatInfo)
            .subscribe(onNext: {[unowned self] info in
                socketManager.sendMessage(korean: info.korean,
                                          english: info.english,
                                          origin: info.lang)
            })
            .disposed(by: rx.disposeBag)
        
        input.originDetailDidTap
            .withLatestFrom(originText)
            .subscribe(onNext: { [unowned self] text in
                fetchDetail(text: text, type: false)
            })
            .disposed(by: rx.disposeBag)
        
        input.translationDetailDidTap
            .withLatestFrom(translationViewState)
            .map { $0.text }
            .subscribe(onNext: { [unowned self] text in
                fetchDetail(text: text, type: true)
            })
            .disposed(by: rx.disposeBag)
        
        let viewText = localize.asDriver().map { $0.scanningViewText }
        
        let needScan = input.scanButtonDidTap.asSignal(onErrorJustReturn: ())
            .map { [unowned self] () -> VNDocumentCameraViewController in
                let cameraViewController = VNDocumentCameraViewController()
                cameraViewController.rx.didFinish
                    .bind(to: scanedImage)
                    .disposed(by: rx.disposeBag)
                return cameraViewController
            }
        
        return Output(viewText: viewText,
                      isActive: activate.asObservable(),
                      needScanning: needScan,
                      originText: originText.asObservable(),
                      translationViewState: translationViewState.asObservable(),
                      detailViewState: detailViewState.asDriver(),
                      needFade: needFade.asObservable(),
                      scanedImage: scanedImage.asObservable(),
                      needAnimation: animating.asObservable(),
                      dismiss: Observable.of(input.sendButtonDidTap,
                                             input.closeButtonDidTap).merge().asSignal(onErrorJustReturn: ()))
    }
}

private extension ScanningViewModel {
    
    func fetchDetail(text: String, type: Bool) {
        detailViewState.accept((text, type))
        needFade.accept(false)
        activate.accept(false)
    }
    
}
