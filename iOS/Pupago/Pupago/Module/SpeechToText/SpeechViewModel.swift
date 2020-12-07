//
//  SpeechViewModel.swift
//  Pupago
//
//  Created by kimn on 2020/12/07.
//

import Foundation
import RxSwift
import RxCocoa

class SpeechViewModel: ViewModel, ViewModelType {
    
    typealias TranslationViewState = (text: String, isHidden: Bool)
    
    struct Input {
        let micTrigger: Observable<Void>
        let sendTrigger: Observable<Void>
        let backTrigger: Observable<Void>
        let originText: Observable<String>
    }
    struct Output {
        let activate: Driver<Bool>
        let available: Driver<Bool>
        let originText: Observable<String>
        let translationViewState: Observable<TranslationViewState>
        let dismiss: Driver<Void>
    }
    
    let activate = BehaviorRelay<Bool>(value: false)
    let originText = PublishRelay<String>()
    let chatInfo = PublishRelay<Translator.Text>()
    let available = BehaviorRelay<Bool>(value: false)
    let translationViewState = PublishRelay<(text: String, isHidden: Bool)>()
    let dismiss = PublishRelay<Void>()
    
    func transform(_ input: Input) -> Output {
        
        let socketManager = SocketIOManager.shared
        let speechManager = SpeechManager()
        let provider = PupagoAPI()
        let translator = Translator(provider: provider)
        
        input.micTrigger
            .subscribe(onNext: { [unowned self] _ in
                speechManager.speechToText()
                let state = activate.value == false ? true : false
                activate.accept(state)
            })
            .disposed(by: rx.disposeBag)
        
        input.originText
            .distinctUntilChanged()
            .debounce(.milliseconds(800), scheduler: MainScheduler.instance)
            .flatMap { translator.translate(with: $0) }
            .subscribe(onNext: { [unowned self] info in
                let translatedText = info.lang == "Korean" ? info.english : info.korean
                translationViewState.accept((translatedText, false))
                chatInfo.accept(info)
                available.accept(true)
            })
            .disposed(by: rx.disposeBag)
        
        input.originText
            .subscribe(onNext: { [unowned self] text in
                let status = text.isEmpty ? ("", true) : ("번역중..", false)
                translationViewState.accept(status)
                available.accept(false)
            })
            .disposed(by: rx.disposeBag)
        
        input.sendTrigger
            .withLatestFrom(chatInfo)
            .subscribe(onNext: { [unowned self] info in
                socketManager.sendMessage(korean: info.korean,
                                          english: info.english,
                                          origin: info.lang)
                dismiss.accept(())
            })
            .disposed(by: rx.disposeBag)
        
        input.backTrigger
            .subscribe(onNext: { [unowned self] _ in
                dismiss.accept(())
            })
            .disposed(by: rx.disposeBag)
        
        speechManager.recognizedSpeech
            .subscribe(onNext: { [unowned self] speech in
                originText.accept(speech)
            })
            .disposed(by: rx.disposeBag)
        
        return Output(activate: activate.asDriver(),
                      available: available.asDriver(),
                      originText: originText.asObservable(),
                      translationViewState: translationViewState.asObservable(),
                      dismiss: dismiss.asDriver(onErrorJustReturn: ()))
    }
}
