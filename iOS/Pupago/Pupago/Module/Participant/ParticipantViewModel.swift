//
//  ParticipantViewModel.swift
//  Pupago
//
//  Created by 김근수 on 2020/12/05.
//

import Foundation
import RxSwift
import RxCocoa

class ParticipantViewModel: ViewModel, ViewModelType {
    
    struct Input {
        let viewWillAppear: Observable<Void>
        let dismissTrigger: Observable<Void>
    }
    struct Output {
        let item: Observable<[Participant]>
        let dismiss: Driver<Void>
    }
    
    init(roomCode: String) {
        self.roomCode = roomCode
    }
    
    let roomCode: String
    let participants = BehaviorRelay<[Participant]>(value: [])
    
    func transform(_ input: Input) -> Output {
        let provider = PupagoAPI()
        
        input.viewWillAppear
            .flatMap { [unowned self] in provider.participantList(roomCode: roomCode) }
            .subscribe(onNext: { [unowned self] result in
                participants.accept(result.participantsList)
            })
            .disposed(by: rx.disposeBag)
        
        let item = participants.asObservable()
        let dismiss = input.dismissTrigger.asDriver(onErrorJustReturn: ())
        
        return Output(item: item,
                      dismiss: dismiss)
    }
    
}
