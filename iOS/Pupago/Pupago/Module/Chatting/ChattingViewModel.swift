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
        let registTrigger: Observable<Void>
    }
    struct Output {
        let viewText: Driver<Localize.ChatroomViewText>
        let roomInfo: Driver<RoomInfo>
        let items: Driver<[MessageSection]>
    }
    
    let chats = BehaviorRelay<[MessageSection]>(value: [])
    let roomInfo = BehaviorRelay<RoomInfo>(value: (nil, nil))
    
    func transform(_ input: Input) -> Output {
        
        input.registTrigger
            .withLatestFrom(input.chatText)
            .subscribe(onNext: { text in
                
                self.chats.accept(self.chats.value +
                                    [MessageSection(header: "Chat", items: [Message(user: .mine, messageItems: MessageItem(text: text, chattingAt: ""))
                                    ])])
            })
            .disposed(by: rx.disposeBag)
        
        let viewText = localize.asDriver()
            .map { $0.chatroomViewText }
        
        let info = roomInfo.asDriver(onErrorJustReturn: (nil, nil))
        
        let chatItem = chats.asDriver(onErrorJustReturn: [])
        
        return Output(viewText: viewText,
                      roomInfo: info,
                      items: chatItem)
    }
    
}
