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
    
    struct Input {
        let chatText: Observable<String?>
        let registTrigger: Observable<Void>
    }
    struct Output {
        let items: Driver<[MessageSection]>
    }
    
    let chats = BehaviorRelay<[MessageSection]>(value: [MessageSection(header: "Chat", items: [Message(user: .others, messageItems: MessageItem(text: "testtest", chattingAt: ""))
    ])])
    
    func transform(_ input: Input) -> Output {
        
        input.registTrigger
            .withLatestFrom(input.chatText)
            .subscribe(onNext: { text in
                
                self.chats.accept(self.chats.value +
                                    [MessageSection(header: "Chat", items: [Message(user: .mine, messageItems: MessageItem(text: "testtest", chattingAt: ""))
                                    ])])
            })
            .disposed(by: rx.disposeBag)
        
        let chatItem = chats.asDriver(onErrorJustReturn: [])
        
        return Output(items: chatItem)
    }
    
}
