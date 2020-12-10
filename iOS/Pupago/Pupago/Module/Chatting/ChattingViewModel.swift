//
//  ChattingViewModel.swift
//  Pupago
//
//  Created by 김근수 on 2020/11/25.
//

import Foundation
import RxSwift
import RxCocoa

class ChattingViewModel: ViewModel, ViewModelType {
    
    typealias RoomInfo = (title: String?, code: String?)
    typealias CopyInfo = (code: String?, localize: String?)
    typealias TranslationViewState = (text: String, isHidden: Bool)
    typealias ParticipantState = (nickname: String, type: Bool)
    
    struct Input {
        let chatText: Observable<String>
        let codeTrigger: Observable<Void>
        let registTrigger: Observable<Void>
        let micTrigger: Observable<Void>
        let showParticipantTrigger: Observable<Void>
        let willLeave: Observable<Void>
    }
    
    struct Output {
        let viewText: Driver<Localize.ChatroomViewText>
        let roomInfo: Driver<RoomInfo>
        let items: Driver<[MessageSection]>
        let translationViewState: Observable<TranslationViewState>
        let reset: Driver<String>
        let scroll: Driver<Void>
        let activate: Driver<Bool>
        let showParticipant: Driver<ParticipantViewModel>
        let speeched: Driver<SpeechViewModel>
        let status: Driver<ParticipantState>
        let clipboard: Driver<CopyInfo>
    }
    
    let chats = BehaviorRelay<[MessageSection]>(value: [MessageSection(header: "Chat", items: [])])
    let roomInfo = BehaviorRelay<RoomInfo>(value: (nil, nil))
    let chatInfo = PublishRelay<Translator.Text>()
    let activate = BehaviorRelay<Bool>(value: false)
    let downScroll = PublishRelay<Void>()
    let translationViewState = PublishRelay<(text: String, isHidden: Bool)>()
    let reset = PublishRelay<Void>()
    let status = BehaviorRelay<(ParticipantState)>(value: ("", false))
    let clipboard = PublishRelay<CopyInfo>()
    
    func transform(_ input: Input) -> Output {
        
        let socketManager = SocketIOManager.shared
        let provider = PupagoAPI()
        let translator = Translator(provider: provider)
        
        // MARK: - Socket Event Control
        
        socketManager.socket.rx.event(.receiveMessage)
            .subscribe(onNext: { [unowned self] data in
                if let msg = self.parse(data) {
                    updateMessage(message: msg)
                    downScroll.accept(())
                }
            })
            .disposed(by: rx.disposeBag)
        
        socketManager.socket.rx.event(.list)
            .subscribe(onNext: { [unowned self] data in
                if let list = self.participantParse(data) {
                    let nickname: String = list.diffNickname ?? ""
                    let type = list.type == "enter" ? true : false
                    self.status.accept((nickname, type))
                }
            })
            .disposed(by: rx.disposeBag)
        
        input.willLeave
            .subscribe(onNext: {
                Application.shared.currentRoomCode = ""
                socketManager.leavChatroom()
                socketManager.socket.off(SocketEndpoint.receiveMessage.eventName)
                socketManager.socket.off(SocketEndpoint.list.eventName)
            })
            .disposed(by: rx.disposeBag)
        
        // MARK: - Translation
        
        input.chatText
            .distinctUntilChanged()
            .debounce(.milliseconds(200), scheduler: MainScheduler.instance)
            .flatMap { translator.translate(with: $0) }
            .subscribe(onNext: { [unowned self] info in
                let translatedText = info.lang == "Korean" ? info.english : info.korean
                translationViewState.accept((translatedText, false))
                chatInfo.accept(info)
                activate.accept(true)
            })
            .disposed(by: rx.disposeBag)
        
        input.chatText
            .subscribe(onNext: { [unowned self] text in
                let status = text.isEmpty ? ("", true) : (localize.value.translating, false)
                translationViewState.accept(status)
                activate.accept(false)
            })
            .disposed(by: rx.disposeBag)
        
        // MARK: - InputBar
        
        input.registTrigger
            .withLatestFrom(chatInfo)
            .subscribe(onNext: { [unowned self] info in
                socketManager.sendMessage(korean: info.korean,
                                          english: info.english,
                                          origin: info.lang)
                translationViewState.accept(("", true))
                reset.accept(())
            })
            .disposed(by: rx.disposeBag)
        
        // MARK: - Drivers
        
        let viewText = localize.asDriver().map { $0.chatroomViewText }
        let info = roomInfo.asDriver(onErrorJustReturn: (nil, nil))
        let chatItem = chats.asDriver(onErrorJustReturn: [])
        let showParticipant = input.showParticipantTrigger
            .withLatestFrom(roomInfo)
            .map { _, code -> ParticipantViewModel in
                let code = code ?? ""
                return ParticipantViewModel(roomCode: code)
            }
            .asDriver(onErrorJustReturn: ParticipantViewModel(roomCode: ""))
        
        let speeched = input.micTrigger
            .asDriver(onErrorJustReturn: ())
            .map { _ in SpeechViewModel() }
        
        input.codeTrigger
            .withLatestFrom(roomInfo)
            .subscribe(onNext: { [unowned self] info in
                let localText = localize.value.chatroomViewText.copy
                clipboard.accept((info.code, localText))
            })
            .disposed(by: rx.disposeBag)
        
        return Output(viewText: viewText,
                      roomInfo: info,
                      items: chatItem,
                      translationViewState: translationViewState.asObservable(),
                      reset: reset.map { "" }.asDriver(onErrorJustReturn: ""),
                      scroll: downScroll.asDriver(onErrorJustReturn: ()),
                      activate: activate.asDriver(),
                      showParticipant: showParticipant,
                      speeched: speeched,
                      status: status.asDriver(),
                      clipboard: clipboard.asDriver(onErrorJustReturn: ("", "")))
    }
    
}

private extension ChattingViewModel {
    
    private func updateMessage(message: Message) {
        guard var section = chats.value.first else { return }
        section.items.append(message)
        chats.accept([section])
    }
    
    private func parse(_ data: [Any]?) -> Message? {
        guard
            let dataString = data?[0] as? String,
            let data = dataString.data(using: .utf8),
            let message = try? JSONDecoder().decode(Message.self, from: data)
        else { return nil }
        
        return message
    }
    
    private func participantParse(_ data: [Any]?) -> Participants? {
        guard
            let dataString = data?[0] as? String,
            let data = dataString.data(using: .utf8),
            let participants = try? JSONDecoder().decode(Participants.self, from: data)
        else { return nil }
        
        return participants
    }
    
}
