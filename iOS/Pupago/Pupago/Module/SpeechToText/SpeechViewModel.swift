//
//  SpeechViewModel.swift
//  Pupago
//
//  Created by kimn on 2020/12/07.
//

import RxSwift
import RxCocoa

final class SpeechViewModel: ViewModel, ViewModelType {
    
    typealias TranslationViewState = (text: String, isHidden: Bool)
    
    // MARK: - Input
    
    struct Input {
        let originText: Observable<String>
        let micButtonDidTap: Observable<Void>
        let sendButtonDidTap: Observable<Void>
        let closeButtonDidTap: Observable<Void>
    }
    
    // MARK: - Output
    
    struct Output {
        let viewTexts: Observable<String>
        let originText: Observable<String>
        let translationViewState: Observable<TranslationViewState>
        let needAssist: Observable<Bool>
        let isMicRunning: Driver<Bool>
        let isActive: Observable<Bool>
        let dismiss: Signal<Void>
    }
    
    // MARK: - State
    
    private let originText = PublishRelay<String>()
    private let chatInfo = PublishRelay<Translator.Text>()
    private let isActive = BehaviorRelay<Bool>(value: false)
    private let isMicRunning = BehaviorRelay<Bool>(value: false)
    private let needAssist = BehaviorRelay<Bool>(value: true)
    private let translationViewState = PublishRelay<TranslationViewState>()
    
    // MARK: - Transform
    
    func transform(_ input: Input) -> Output {
        let translator = Translator(provider: provider)
        let speechManager = SpeechManager()
        
        input.originText
            .distinctUntilChanged()
            .debounce(.milliseconds(200), scheduler: MainScheduler.instance)
            .flatMap { translator.translate(with: $0) }
            .subscribe(onNext: { [unowned self] info in
                let translatedText = info.lang == "Korean" ? info.english : info.korean
                chatInfo.accept(info)
                isActive.accept(true)
                translationViewState.accept((translatedText, false))
            })
            .disposed(by: rx.disposeBag)
        
        input.originText
            .subscribe(onNext: { [unowned self] text in
                let status = text.isEmpty ? ("", true) : (localize.value.userMessage.translating, false)
                needAssist.accept(status.1)
                translationViewState.accept(status)
                isActive.accept(false)
            })
            .disposed(by: rx.disposeBag)
        
        input.micButtonDidTap
            .subscribe(onNext: { [unowned self] _ in
                speechManager.speechToText()
                isMicRunning.accept(!isMicRunning.value)
                needAssist.accept(false)
            })
            .disposed(by: rx.disposeBag)
        
        input.sendButtonDidTap
            .withLatestFrom(chatInfo)
            .subscribe(onNext: { [unowned self] info in
                socketManager.sendMessage(korean: info.korean,
                                          english: info.english,
                                          origin: info.lang)
            })
            .disposed(by: rx.disposeBag)
        
        speechManager.recognizedSpeech
            .bind(to: originText)
            .disposed(by: rx.disposeBag)
        
        let viewtext = localize.asDriver()
            .map { $0.speechViewText.assist }
        
        let dismiss = Observable.of(input.sendButtonDidTap, input.closeButtonDidTap).merge()
            .asSignal(onErrorJustReturn: ())
        
        return Output(viewTexts: viewtext.asObservable(),
                      originText: originText.asObservable(),
                      translationViewState: translationViewState.asObservable(),
                      needAssist: needAssist.asObservable(),
                      isMicRunning: isMicRunning.asDriver(),
                      isActive: isActive.asObservable(),
                      dismiss: dismiss)
        
    }
}
