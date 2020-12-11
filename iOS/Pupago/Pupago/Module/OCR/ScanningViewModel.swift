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
    
    struct Input {
        let originText: Observable<String>
        let scanButtonTap: Observable<Void>
        let sendButtonTap: Observable<Void>
        let dismissButtonTap: Observable<Void>
    }
    
    struct Output {
        let needScanning: Signal<VNDocumentCameraViewController>
        let originText: Observable<String>
        let translationViewState: Observable<TranslationViewState>
        let needAnimation: Observable<Bool>
        let dismiss: Signal<Void>
    }
    
    let scanedImage = PublishRelay<UIImage>()
    let translationViewState = PublishRelay<(text: String, isHidden: Bool)>()
    let chatInfo = PublishRelay<Translator.Text>()
    let animating = BehaviorRelay<Bool>(value: false)
    let originText = PublishRelay<String>()
    
    func transform(_ input: Input) -> Output {
        
        let provider = PupagoAPI()
        let socketManager = SocketIOManager.shared
        let translator = Translator(provider: provider)
        
        input.originText
            .distinctUntilChanged()
            .debounce(.milliseconds(200), scheduler: MainScheduler.instance)
            .flatMap { translator.translate(with: $0) }
            .subscribe(onNext: { [unowned self] info in
                let translatedText = info.lang == "Korean" ? info.english : info.korean
                chatInfo.accept(info)
                translationViewState.accept((translatedText, false))
            })
            .disposed(by: rx.disposeBag)
        
        input.originText
            .subscribe(onNext: { [unowned self] text in
                let status = text.isEmpty ? ("", true) : (localize.value.translating, false)
                translationViewState.accept(status)
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
        
        return Output(needScanning: needScan,
                      originText: originText.asObservable(),
                      translationViewState: translationViewState.asObservable(),
                      needAnimation: animating.asObservable(),
                      dismiss: input.dismissButtonTap.asSignal(onErrorJustReturn: ()))
    }
}
