//
//  ParticipantViewModel.swift
//  Pupago
//
//  Created by 김근수 on 2020/12/05.
//

import RxSwift
import RxCocoa

final class ParticipantViewModel: ViewModel, ViewModelType {
    
    // MARK: - Input
    
    struct Input {
        let viewWillAppear: Observable<Void>
        let dimmingViewDidTap: Observable<Void>
        let closeButtonDidTap: Observable<Void>
    }
    
    // MARK: - Output
    
    struct Output {
        let viewTexts: Driver<Localize.ParticipantViewText>
        let participants: Observable<[Participant]>
        let dismiss: Signal<Void>
    }
    
    // MARK: - State
    
    private var roomCode: String
    private let participants = BehaviorRelay<[Participant]>(value: [])
    
    // MARK: - Init
    
    init(provider: NetworkProviding, roomCode: String) {
        self.roomCode = roomCode
        super.init(provider: provider)
    }

    // MARK: - Transform
    
    func transform(_ input: Input) -> Output {
        input.viewWillAppear
            .flatMap { [unowned self] in provider.participantList(roomCode: roomCode) }
            .map { $0.participants }
            .subscribe(onNext: { [unowned self] participantsList in
                participants.accept(participantsList)
            })
            .disposed(by: rx.disposeBag)
        
        let viewText = localize.asDriver()
            .map { $0.participantViewText }
        
        let dismiss = Observable.of(input.dimmingViewDidTap, input.closeButtonDidTap).merge()
            .asSignal(onErrorJustReturn: ())
        
        return Output(viewTexts: viewText,
                      participants: participants.asObservable(),
                      dismiss: dismiss)
    }
    
}
