//
//  CreateRoomViewModel.swift
//  Pupago
//
//  Created by 김근수 on 2020/11/25.
//

import Foundation
import RxSwift
import RxCocoa

final class CreateRoomViewModel: ViewModel, ViewModelType {
    struct Input {
        let roomName: Observable<String>
        let privateSelection: Observable<Bool>
        let createTrigger: Observable<Void>
        let cancelTrigger: Observable<Void>
    }
    
    struct Output {
        let viewTexts: Driver<Localize.CreateRoomViewText>
        let hasValidRoomName: Driver<Bool>
        let activate: Driver<Bool>
        let dismiss: Driver<Void>
    }
    
    let isEmpty = BehaviorRelay<Bool>(value: true)
    let isValid = BehaviorRelay<Bool>(value: false)
    let roomInfo = PublishSubject<(code: String, isPrivate: Bool)>()
    
    func transform(_ input: Input) -> Output {
        
        let provider = PupagoAPI()
        
        input.roomName
            .map { $0.isEmpty }
            .bind(to: isEmpty)
            .disposed(by: rx.disposeBag)
        
        input.roomName
            .map { self.validate(roomName: $0) }
            .bind(to: isValid)
            .disposed(by: rx.disposeBag)
        
        let viewText = localize.asDriver()
            .map { $0.createRoomViewText }
        
        let validate = Observable.zip(isEmpty, isValid)
            .map { $0 || $1 }
            .asDriver(onErrorJustReturn: false)
        
        let activate = Observable.zip(isEmpty, isValid)
            .map { !$0 && $1 }
            .asDriver(onErrorJustReturn: false)
        
        let created = input.createTrigger
            .withLatestFrom(Observable.combineLatest(input.roomName, input.privateSelection))
            .map { [unowned self] (name, isPrivate) in
                provider.createRoom(title: name, isPrivate: isPrivate).asObservable()
                    .map { ($0.roomCode ?? "", isPrivate) }
                    .bind(to: roomInfo)
                    .disposed(by: rx.disposeBag)
            }
        
        let dismiss = Observable.of(created, input.cancelTrigger).merge()
            .asDriver(onErrorJustReturn: ())
        
        return Output(viewTexts: viewText,
                      hasValidRoomName: validate,
                      activate: activate,
                      dismiss: dismiss)
    }
    
}

private extension CreateRoomViewModel {
    
    private func validate(roomName: String) -> Bool {
        guard roomName.count >= 2 && roomName.count <= 30,
              RegexManager.validate(of: roomName, for: .roomName)
        else { return false }
        
        return true
    }
    
}
