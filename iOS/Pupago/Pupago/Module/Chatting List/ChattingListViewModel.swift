//
//  ChattingMainViewModel.swift
//  Pupago
//
//  Created by kimn on 2020/11/24.
//

import Foundation
import RxSwift
import RxCocoa

final class ChattingListViewModel: ViewModel, ViewModelType {
    
    struct Input {
        let createTrigger: Observable<Void>
        let joinTrigger: Observable<Void>
        let selection: Observable<Void>
    }
    
    struct Output {
        let viewTexts: Driver<(localizeTexts: Localize.ChatListViewText, nickname: String)>
        let item: Driver<[Int]> // Mock for UI
        let created: Driver<CreateRoomViewModel>
        let joined: Driver<JoinRoomViewModel>
        let selected: Driver<ChattingViewModel>
    }
    
    // Mock for UI
    let rooms = BehaviorRelay<[Int]>(value: Array(1...5))
    
    func transform(_ input: Input) -> Output {
        
        let viewText = localize.asDriver()
            .map { (localizeTexts: $0.chattingListViewText, nickname: Application.shared.userName) }
        
        let roomItem = rooms.asDriver(onErrorJustReturn: [])
        
        let created = input.createTrigger
            .map { CreateRoomViewModel() }
            .asDriver(onErrorJustReturn: CreateRoomViewModel())
        
        let joined = input.joinTrigger
            .map { JoinRoomViewModel() }
            .asDriver(onErrorJustReturn: JoinRoomViewModel())
        
        let selected = input.selection
            .map { ChattingViewModel() }
            .asDriver(onErrorJustReturn: ChattingViewModel())
        
        return Output(viewTexts: viewText,
                      item: roomItem,
                      created: created,
                      joined: joined,
                      selected: selected)
    }
    
}
