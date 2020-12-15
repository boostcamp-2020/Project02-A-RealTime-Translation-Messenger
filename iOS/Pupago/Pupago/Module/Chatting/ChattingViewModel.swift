//
//  ChattingViewModel.swift
//  Pupago
//
//  Created by 김근수 on 2020/11/25.
//

import RxSwift
import RxCocoa

class ChattingViewModel: ViewModel, ViewModelType {
    
    typealias RoomInfo = (title: String?, code: String?)
    typealias TranslationViewState = (text: String, isHidden: Bool)
    
    // MARK: - Input
    
    struct Input {
        let chatText: Observable<String>
        let codeButtonDidTap: Observable<Void>
        let sendButtonDidTap: Observable<Void>
        let micButtonDidTap: Observable<Void>
        let scanButtonDidTap: Observable<Void>
        let participantButtonDidTap: Observable<Void>
        let viewWillDisappear: Observable<Void>
    }
    
    // MARK: - Output
    
    struct Output {
        let viewTexts: Driver<Localize.ChatroomViewText>
        let roomInfo: Driver<RoomInfo>
        let isActive: Driver<Bool>
        let chats: Observable<[MessageSection]>
        let translationViewState: Observable<TranslationViewState>
        let toasterMessage: Observable<String>
        let needResetInput: Observable<Void>
        let needScrollDown: Observable<Void>
        let showParticipantView: Signal<ParticipantViewModel>
        let showSpeechView: Signal<SpeechViewModel>
        let showScanView: Signal<ScanningViewModel>
    }
    
    // MARK: - State
    
    private let chats = BehaviorRelay<[MessageSection]>(value: [MessageSection(header: "Chat", items: [])])
    private let roomInfo = BehaviorRelay<RoomInfo>(value: (nil, nil))
    private let chatInfo = PublishRelay<Translator.Text>()
    private let isActive = BehaviorRelay<Bool>(value: false)
    private let downScroll = PublishRelay<Void>()
    private let toasterMessage = PublishRelay<String>()
    private let translationViewState = PublishRelay<(text: String, isHidden: Bool)>()
    private let reset = PublishRelay<Void>()
    
    // MARK: - Transform
    
    func transform(_ input: Input) -> Output {
        let translator = Translator(provider: provider)
        
        // Handle receiving message
        socketManager.socket.rx.event(.receiveMessage)
            .flatMap { [unowned self] data -> Observable<Message> in parse(data) }
            .subscribe(onNext: { [unowned self] message in
                updateMessage(message: message)
                downScroll.accept(())
            }, onError: { error in
                print(error)
            })
            .disposed(by: rx.disposeBag)
        
        // Handle receiving participant event
        // Event occurs when someone came in or leave out
        socketManager.socket.rx.event(.list)
            .flatMap { [unowned self] data -> Observable<Participants> in parse(data) }
            .subscribe(onNext: { [unowned self] result in
                toasterMessage.accept(result.stateMessage)
            }, onError: { error in
                print(error)
            })
            .disposed(by: rx.disposeBag)
        
        input.viewWillDisappear
            .subscribe(onNext: { [unowned self] in
                Application.shared.currentRoomCode = ""
                socketManager.leavChatroom()
                socketManager.socket.off(SocketEndpoint.receiveMessage.eventName)
                socketManager.socket.off(SocketEndpoint.list.eventName)
            })
            .disposed(by: rx.disposeBag)
        
        input.chatText
            .distinctUntilChanged()
            .debounce(.milliseconds(200), scheduler: MainScheduler.instance)
            .flatMap { translator.translate(with: $0) }
            .subscribe(onNext: { [unowned self] info in
                let translatedText = info.lang == "Korean" ? info.english : info.korean
                translationViewState.accept((translatedText, false))
                chatInfo.accept(info)
                isActive.accept(true)
            })
            .disposed(by: rx.disposeBag)
        
        input.chatText
            .subscribe(onNext: { [unowned self] text in
                let status = text.isEmpty ? ("", true) : (localize.value.userMessage.translating, false)
                translationViewState.accept(status)
                isActive.accept(false)
            })
            .disposed(by: rx.disposeBag)
        
        input.sendButtonDidTap
            .withLatestFrom(chatInfo)
            .subscribe(onNext: { [unowned self] info in
                socketManager.sendMessage(korean: info.korean,
                                          english: info.english,
                                          origin: info.lang)
                translationViewState.accept(("", true))
                reset.accept(())
            })
            .disposed(by: rx.disposeBag)
        
        input.codeButtonDidTap
            .withLatestFrom(roomInfo)
            .map { $0.code }
            .subscribe(onNext: { [unowned self] code in
                UIPasteboard.general.string = code
                toasterMessage.accept("\(code ?? "")\(localize.value.userMessage.copy)")
            })
            .disposed(by: rx.disposeBag)
        
        let viewTexts = localize.asDriver()
            .map { $0.chatroomViewText }
        
        let showParticipant = input.participantButtonDidTap.asSignal(onErrorJustReturn: ())
            .map { [unowned self] () -> ParticipantViewModel in
                return ParticipantViewModel(provider: provider, roomCode: roomInfo.value.code ?? "")
            }
        
        let showSpeechView = input.micButtonDidTap.asSignal(onErrorJustReturn: ())
            .map { [unowned self] _ in SpeechViewModel(provider: provider) }
        
        let showScanView = input.scanButtonDidTap.asSignal(onErrorJustReturn: ())
            .map { [unowned self] _ in ScanningViewModel(provider: provider) }
        
        return Output(viewTexts: viewTexts,
                      roomInfo: roomInfo.asDriver(onErrorJustReturn: (nil, nil)),
                      isActive: isActive.asDriver(onErrorJustReturn: false),
                      chats: chats.asObservable(),
                      translationViewState: translationViewState.asObservable(),
                      toasterMessage: toasterMessage.asObservable(),
                      needResetInput: reset.asObservable(),
                      needScrollDown: downScroll.asObservable(),
                      showParticipantView: showParticipant,
                      showSpeechView: showSpeechView,
                      showScanView: showScanView)
    }
    
}

private extension ChattingViewModel {
    
    func updateMessage(message: Message) {
        guard var section = chats.value.first else { return }
        section.items.append(message)
        chats.accept([section])
    }
    
    func parse<ResultType: Decodable>(_ data: [Any]?) -> Observable<ResultType> {
        return Observable.create { observer in
            guard let dataString = data?[0] as? String,
                  let data = dataString.data(using: .utf8)
            else { return Disposables.create() }
            do {
                let result = try JSONDecoder().decode(ResultType.self, from: data)
                observer.onNext(result)
            } catch {
                observer.onError(error)
            }
            return Disposables.create()
        }
    }
    
}
