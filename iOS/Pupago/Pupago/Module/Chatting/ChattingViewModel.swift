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
    
    struct Input {
        let chatText: Observable<String>
        let inputChanged: Observable<Void>
        let deactivateTrigger: Observable<Void>
        let registTrigger: Observable<Void>
        let willLeave: Observable<Void>
    }
    
    struct Output {
        let viewText: Driver<Localize.ChatroomViewText>
        let roomInfo: Driver<RoomInfo>
        let items: Driver<[MessageSection]>
        let translated: Driver<String>
        let textChanged: Driver<String>
        let reset: Driver<Void>
        let scroll: Driver<Void>
        let activate: Driver<Bool>
    }
    
    let chats = BehaviorRelay<[MessageSection]>(value: [MessageSection(header: "Chat", items: [])])
    let roomInfo = BehaviorRelay<RoomInfo>(value: (nil, nil))
    let chatInfo = PublishRelay<Translator.Text>()
    let activate = BehaviorRelay<Bool>(value: false)
    let downScroll = PublishRelay<Void>()

    func transform(_ input: Input) -> Output {
        
        let socketManager = SocketIOManager.shared
        let provider = PupagoAPI()
        let translator = Translator(provider: provider)
        
        // MARK: - Observing Socket Events
        
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
        
        input.chatText
            .distinctUntilChanged()
            .filter { !$0.isEmpty }
            .debounce(.milliseconds(500), scheduler: MainScheduler.instance)
            .flatMap { translator.translate(with: $0) }
            .bind(to: chatInfo)
            .disposed(by: rx.disposeBag)
        
        let textChanged = input.inputChanged
            .withLatestFrom(input.chatText)
            .map { text in
                return text.isEmpty ? "" : "번역중.."
            }
            .asDriver(onErrorJustReturn: "")
        
        let translated = chatInfo
            .map { [unowned self] info in
                self.activate.accept(true)
                return info.lang == "Korean" ? info.english : info.korean
            }
            .asDriver(onErrorJustReturn: "")

        input.registTrigger
            .withLatestFrom(chatInfo)
            .subscribe(onNext: { info in
                socketManager.sendMessage(korean: info.korean,
                                          english: info.english,
                                          origin: info.lang)
            })
            .disposed(by: rx.disposeBag)
        
        input.willLeave
            .subscribe(onNext: {
                socketManager.leavChatroom()
                socketManager.socket.removeAllHandlers()
            })
            .disposed(by: rx.disposeBag)
        
        input.deactivateTrigger
            .map { false }
            .bind(to: activate)
            .disposed(by: rx.disposeBag)
        
        let viewText = localize.asDriver()
            .map { $0.chatroomViewText }
        
        let info = roomInfo.asDriver(onErrorJustReturn: (nil, nil))
        let reset = input.registTrigger.asDriver(onErrorJustReturn: ())
        
        let chatItem = chats.asDriver(onErrorJustReturn: [])
        
        return Output(viewText: viewText,
                      roomInfo: info,
                      items: chatItem,
                      translated: translated,
                      textChanged: textChanged,
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
