//
//  JoinRoomViewModel.swift
//  Pupago
//
//  Created by 김근수 on 2020/11/25.
//

import Foundation
import RxSwift
import RxCocoa

final class JoinRoomViewModel: ViewModel, ViewModelType {
    
    struct Input {
        let roomCode: Observable<[String]>
        let cancelTrigger: Observable<Void>
    }
    
    struct Output {
        let viewTexts: Driver<Localize.JoinRoomViewText>
        let activate: Driver<Bool>
        let dismiss: Driver<Void>
    }
    
    let isFull = BehaviorRelay<Bool>(value: false)
    let isValid = BehaviorRelay<Bool>(value: false)
    
    func transform(_ input: Input) -> Output {
        
        input.roomCode
            .map { $0.joined() }
            .subscribe(onNext: { [weak self] code in
                self?.isFull.accept(code.count == 4)
                self?.isValid.accept(self?.validate(code) ?? false)
            })
            .disposed(by: rx.disposeBag)
        
        let viewText = localize.asDriver()
            .map { $0.joinRoomViewText }
        
        let activate = Observable.combineLatest(isFull, isValid)
            .map { $0 && $1 }
            .asDriver(onErrorJustReturn: false)
        
        let dismiss = input.cancelTrigger
            .map { _ in }
            .asDriver(onErrorJustReturn: ())
        
        return Output(viewTexts: viewText,
                      activate: activate,
                      dismiss: dismiss)
    }
    
}

private extension JoinRoomViewModel {
    
    func validate(_ code: String) -> Bool {
        guard code.count == 4,
              RegexManager.validate(of: code, for: .roomCode)
        else { return false }
        
        return true
    }
    
}
