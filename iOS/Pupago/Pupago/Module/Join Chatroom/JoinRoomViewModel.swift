//
//  JoinRoomViewModel.swift
//  Pupago
//
//  Created by 김근수 on 2020/11/25.
//

import Foundation
import RxSwift
import RxCocoa

class JoinRoomViewModel: ViewModel, ViewModelType {
    
    struct Input {
        let closeRoomTrigger: Observable<Void>
    }
    
    struct Output {
        let dismiss: Driver<Void>
    }
    
    func transform(_ input: Input) -> Output {
        
        let closeSelected = input.closeRoomTrigger
            .map { _ in }
            .asDriver(onErrorJustReturn: ())
        
        return Output(dismiss: closeSelected)
    }
}
