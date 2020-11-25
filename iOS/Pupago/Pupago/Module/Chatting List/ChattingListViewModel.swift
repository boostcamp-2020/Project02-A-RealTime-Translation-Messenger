//
//  ChattingMainViewModel.swift
//  Pupago
//
//  Created by kimn on 2020/11/24.
//

import Foundation
import RxSwift
import RxCocoa

class ChattingListViewModel: ViewModel, ViewModelType {
    
    struct Input {
        let createRoomTrigger: Observable<Void>
        let joinRoomTrigger: Observable<Void>
        let selection: Observable<Void>
    }
    
    struct Output {
        let viewTexts: Driver<(localizeTexts: Localize.ChatListViewText, nickname: String)>
        let roomItem: Driver<[Int]> // Mock for UI
        let createSelected: Driver<CreateRoomViewModel>
        let joinSelected: Driver<JoinRoomViewModel>
        let selection: Driver<ChattingViewModel>
    }
    
    // Mock for UI
    let rooms = BehaviorRelay<[Int]>(value: Array(1...5))
    
    func transform(_ input: Input) -> Output {
        
        let viewText = localize.asDriver()
            .map { (localizeTexts: $0.chattingListViewText, nickname: Application.shared.userName) }
        
        let roomItem = rooms.asDriver(onErrorJustReturn: [])
        
        let createSelected = input.createRoomTrigger
            .map { CreateRoomViewModel() }
            .asDriver(onErrorJustReturn: CreateRoomViewModel())
        
        let joinSelected = input.createRoomTrigger
            .map { JoinRoomViewModel() }
            .asDriver(onErrorJustReturn: JoinRoomViewModel())
        
        let selection = input.selection
            .map { ChattingViewModel() }
            .asDriver(onErrorJustReturn: ChattingViewModel())
        
        return Output(viewTexts: viewText,
                      roomItem: roomItem,
                      createSelected: createSelected,
                      joinSelected: joinSelected,
                      selection: selection)
    }
    
}
