//
//  ChattingViewModel.swift
//  Pupago
//
//  Created by 김근수 on 2020/11/25.
//

import Foundation
import RxSwift
import RxCocoa
import RxDataSources

class ChattingViewModel: ViewModel, ViewModelType {
    
    typealias RoomInfo = (title: String?, code: String?)
    typealias TranslationViewState = (text: String, isHidden: Bool)
    
    struct Input {
        let chatText: Observable<String>
        let registTrigger: Observable<Void>
        let willLeave: Observable<Void>
    }
    
    struct Output {
        let viewText: Driver<Localize.ChatroomViewText>
        let roomInfo: Driver<RoomInfo>
        let items: Driver<[MessageSection]>
        let translationViewState: Observable<TranslationViewState>
        let reset: Driver<Void>
        let scroll: Driver<Void>
        let activate: Driver<Bool>
    }
    
    let chats = BehaviorRelay<[MessageSection]>(value: [MessageSection(header: "Chat", items: [])])
    let roomInfo = BehaviorRelay<RoomInfo>(value: (nil, nil))
    let chatInfo = PublishRelay<Translator.Text>()
    let activate = BehaviorRelay<Bool>(value: false)
    let downScroll = PublishRelay<Void>()
    let translationViewState = PublishRelay<(text: String, isHidden: Bool)>()

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
            .subscribe(onNext: { data in
                print("Participant changed!")
            })
            .disposed(by: rx.disposeBag)
        
        input.willLeave
            .subscribe(onNext: {
                socketManager.leavChatroom()
                socketManager.socket.removeAllHandlers()
            })
            .disposed(by: rx.disposeBag)
        
        // MARK: - Translation
        
        input.chatText
            .distinctUntilChanged()
            .debounce(.milliseconds(800), scheduler: MainScheduler.instance)
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
                let status = text.isEmpty ? ("", true) : ("번역중..", false)
                translationViewState.accept(status)
                activate.accept(false)
            })
            .disposed(by: rx.disposeBag)
        
        // MARK: - InputBar
        
        input.registTrigger
            .withLatestFrom(chatInfo)
            .subscribe(onNext: { info in
                socketManager.sendMessage(korean: info.korean,
                                          english: info.english,
                                          origin: info.lang)
            })
            .disposed(by: rx.disposeBag)
        
        // MARK: - Drivers
        
        let viewText = localize.asDriver().map { $0.chatroomViewText }
        let info = roomInfo.asDriver(onErrorJustReturn: (nil, nil))
        let reset = input.registTrigger.asDriver(onErrorJustReturn: ())
        let chatItem = chats.asDriver(onErrorJustReturn: [])
        
        return Output(viewText: viewText,
                      roomInfo: info,
                      items: chatItem,
                      translationViewState: translationViewState.asObservable(),
                      reset: reset,
                      scroll: downScroll.asDriver(onErrorJustReturn: ()),
                      activate: activate.asDriver())
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
    
}
