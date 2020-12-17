//
//  CreateRoomViewModel.swift
//  Pupago
//
//  Created by 김근수 on 2020/11/25.
//

import RxSwift
import RxCocoa

final class CreateRoomViewModel: ViewModel, ViewModelType {
    
    typealias RoomInfo = (code: String, isPrivate: Bool)
    
    // MARK: - Input
    
    struct Input {
        let roomName: Observable<String>
        let privateDidSelect: Observable<Bool>
        let createButtonTap: Observable<Void>
        let cancelButtonTap: Observable<Void>
        let dimmingViewDidTap: Observable<Void>
    }
    
    // MARK: - Output
    
    struct Output {
        let viewTexts: Driver<Localize.CreateRoomViewText>
        let isValidRoomName: Observable<Bool>
        let isActive: Driver<Bool>
        let needShake: Observable<Bool>
        let dismiss: Signal<Void>
    }
    
    // MARK: - State
    
    private let isEmpty = BehaviorRelay<Bool>(value: true)
    private let isValid = BehaviorRelay<Bool>(value: false)
    private let needShake = BehaviorRelay<Bool>(value: false)
    let roomInfo = PublishSubject<RoomInfo>()
    
    // MARK: - Transform
    
    func transform(_ input: Input) -> Output {
        input.roomName
            .subscribe(onNext: { [unowned self] in
                isEmpty.accept($0.isEmpty)
                isValid.accept(validate(roomName: $0))
                needShake.accept(validateLength(nickname: $0))
            })
            .disposed(by: rx.disposeBag)
        
        input.createButtonTap
            .withLatestFrom(Observable.combineLatest(input.roomName, input.privateDidSelect))
            .flatMap { [unowned self] (name, isPrivate) in
                provider.createRoom(title: name, isPrivate: isPrivate)
            }
            .map { ($0.roomCode ?? "", $0.isPrivate == "true") }
            .bind(to: roomInfo)
            .disposed(by: rx.disposeBag)
        
        let viewText = localize.asDriver()
            .map { $0.createRoomViewText }
        
        let isValidRoomName = Observable.combineLatest(isEmpty, isValid)
            .map { $0 || $1 }
        
        let isActive = Observable.combineLatest(isEmpty, isValid)
            .map { !$0 && $1 }
            .asDriver(onErrorJustReturn: false)
        
        let dismiss = Observable.of(roomInfo.asObservable().map {_ in},
                                    input.cancelButtonTap,
                                    input.dimmingViewDidTap).merge()
            .asSignal(onErrorJustReturn: ())
        
        return Output(viewTexts: viewText,
                      isValidRoomName: isValidRoomName,
                      isActive: isActive,
                      needShake: needShake.asObservable(),
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
    
    private func validateLength(nickname: String) -> Bool {
        guard nickname.count == 30 else { return false }
        
        return true
    }
    
}
