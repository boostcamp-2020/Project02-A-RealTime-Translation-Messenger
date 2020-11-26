//
//  CreateRoomViewModel.swift
//  Pupago
//
//  Created by 김근수 on 2020/11/25.
//

import Foundation
import RxSwift
import RxCocoa

class CreateRoomViewModel: ViewModel, ViewModelType {
    struct Input {
        let roomNameText: Observable<String?>
        let createRoomTrigger: Observable<Void>
        let closeRoomTrigger: Observable<Void>
    }
    
    struct Output {
        let viewTexts: Driver<Localize.CreateRoomViewText>
        let isRoomNameValid: Driver<Bool>
        let activate: Driver<Bool>
        let createButtonSelected: Driver<ChattingViewModel>
        let dismiss: Driver<Void>
    }
    
    let isEmpty = BehaviorRelay<Bool>(value: true)
    let isValid = BehaviorRelay<Bool>(value: false)
    
    func transform(_ input: Input) -> Output {
        input.roomNameText
            .map { $0?.isEmpty ?? true }
            .bind(to: isEmpty)
            .disposed(by: rx.disposeBag)
        
        input.roomNameText
            .map { self.validate(roomName: $0 ?? "") }
            .bind(to: isValid)
            .disposed(by: rx.disposeBag)
        
        let viewText = localize.asDriver()
            .map { $0.createRoomViewText }
        
        let isRoomNameValid = Observable.zip(isEmpty, isValid)
            .map { $0 || $1 }
            .asDriver(onErrorJustReturn: false)
        
        let activate = Observable.zip(isEmpty, isValid)
            .map { !$0 && $1 }
            .asDriver(onErrorJustReturn: false)
        
        let createButtonSelected = input.createRoomTrigger
            .map { ChattingViewModel() }
            .asDriver(onErrorJustReturn: ChattingViewModel())
        
        let closeSelected = input.closeRoomTrigger
            .map { _ in }
            .asDriver(onErrorJustReturn: ())
        
        return Output(viewTexts: viewText,
                      isRoomNameValid: isRoomNameValid,
                      activate: activate,
                      createButtonSelected: createButtonSelected,
                      dismiss: closeSelected)
    }
    
    private func validate(roomName: String) -> Bool {
        guard roomName.count >= 2 && roomName.count <= 30 else { return false }
        guard getSyntaxAfterRegex(newText: roomName) else { return false }
        
        return true
    }
}
