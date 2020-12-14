//
//  ScanningViewModel.swift
//  Pupago
//
//  Created by 김근수 on 2020/12/10.
//

//import UIKit
import RxSwift
import RxCocoa
import VisionKit

class ScanningViewModel: ViewModel, ViewModelType {
    
    typealias TranslationViewState = (text: String, isHidden: Bool)
    typealias SeeMoreViewState = (text: String, type: Bool)
    
    struct Input {
        let seeMoreText: Observable<String>
        let originSeeMoreTap: Observable<Void>
        let translationSeeMoreTap: Observable<Void>
        let cancleButtonTap: Observable<Void>
        let scanButtonTap: Observable<Void>
        let sendButtonTap: Observable<Void>
        let dismissButtonTap: Observable<Void>
    }
    
    struct Output {
        let viewText: Driver<Localize.ScanningViewText>
        let activate: Driver<Bool>
        let needScanning: Signal<VNDocumentCameraViewController>
        let originText: Observable<String>
        let translationViewState: Observable<TranslationViewState>
        let seeMoreViewState: Driver<SeeMoreViewState>
        let seeMoreState: Observable<Bool>
        let scanedImage: Observable<UIImage>
        let needAnimation: Observable<Bool>
        let dismiss: Signal<Void>
    }
    
    let activate = BehaviorRelay<Bool>(value: false)
    let available = BehaviorRelay<Bool>(value: true)
    let scanedImage = PublishRelay<UIImage>()
    let translationViewState = PublishRelay<(text: String, isHidden: Bool)>()
    let chatInfo = PublishRelay<Translator.Text>()
    let animating = BehaviorRelay<Bool>(value: false)
    let originText = PublishRelay<String>()
    let seeMoreViewState = BehaviorRelay<(text: String, type: Bool)>(value: ("", false))
    let seeMoreState = BehaviorRelay<Bool>(value: true)
    
    func transform(_ input: Input) -> Output {
        
        let provider = PupagoAPI()
        let socketManager = SocketIOManager.shared
        let translator = Translator(provider: provider)
        let viewText = localize.asDriver().map { $0.scanningViewText }
        
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
            .subscribe(onNext: { [unowned self] text in
                let status = text.isEmpty ? ("", true) : (localize.value.translating, false)
                translationViewState.accept(status)
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
        
        input.seeMoreText
            .subscribe(onNext: { [unowned self] text in
                seeMoreViewState.value.type ? translationViewState.accept((text, false)) : (available.value ? available.accept(false) : originText.accept(text))
                
            })
            .disposed(by: rx.disposeBag)
        
        input.cancleButtonTap
            .map { return true }
            .bind(to: seeMoreState, activate, available)
            .disposed(by: rx.disposeBag)
        
        input.sendButtonTap
            .withLatestFrom(chatInfo)
            .subscribe(onNext: { info in
                socketManager.sendMessage(korean: info.korean,
                                          english: info.english,
                                          origin: info.lang)
            })
            .disposed(by: rx.disposeBag)
        
        let needScan = input.scanButtonTap.asSignal(onErrorJustReturn: ())
            .map { [unowned self] () -> VNDocumentCameraViewController in
                let cameraViewController = VNDocumentCameraViewController()
                cameraViewController.rx.didFinish
                    .bind(to: scanedImage)
                    .disposed(by: rx.disposeBag)
                return cameraViewController
            }
        
        input.originSeeMoreTap
            .withLatestFrom(originText)
            .subscribe(onNext: { [unowned self] text in
                seeMoreViewState.accept((text, false))
                seeMoreState.accept(false)
                available.accept(true)
                activate.accept(false)
            })
            .disposed(by: rx.disposeBag)
        
        input.translationSeeMoreTap
            .withLatestFrom(translationViewState)
            .subscribe(onNext: { [unowned self] state in
                seeMoreViewState.accept((state.text, true))
                seeMoreState.accept(false)
                activate.accept(false)
            })
            .disposed(by: rx.disposeBag)
        
        return Output(viewText: viewText,
                      activate: activate.asDriver(),
                      needScanning: needScan,
                      originText: originText.asObservable(),
                      translationViewState: translationViewState.asObservable(),
                      seeMoreViewState: seeMoreViewState.asDriver(),
                      seeMoreState: seeMoreState.asObservable(),
                      scanedImage: scanedImage.asObservable(),
                      needAnimation: animating.asObservable(),
                      dismiss: Observable.of(input.sendButtonTap, input.dismissButtonTap).merge().asSignal(onErrorJustReturn: ()))
    }
}
