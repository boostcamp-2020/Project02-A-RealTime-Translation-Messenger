//
//  JoinRoomViewModel.swift
//  Pupago
//
//  Created by 김근수 on 2020/11/25.
//

import RxSwift
import RxCocoa

final class JoinRoomViewModel: ViewModel, ViewModelType {
    
    // MARK: - Input
    
    struct Input {
        let roomCode: Observable<[String]>
        let dimmingViewDidTap: Observable<Void>
        let joinButtonDidTap: Observable<Void>
        let closeButtonDidTap: Observable<Void>
    }
    
    // MARK: - Output
    
    struct Output {
        let viewTexts: Driver<Localize.JoinRoomViewText>
        let isActive: Driver<Bool>
        let dismiss: Signal<Void>
    }
    
    // MARK: - State
    
    private let isFull = BehaviorRelay<Bool>(value: false)
    private let isValid = BehaviorRelay<Bool>(value: false)
    let roomInfo = PublishSubject<(code: String, isPrivate: Bool)>()
    
    // MARK: - Transform
    
    func transform(_ input: Input) -> Output {
        
        input.roomCode
            .distinctUntilChanged()
            .map { $0.joined().uppercased() }
            .subscribe(onNext: { [unowned self] code in
                print(code)
                isFull.accept(code.count == 4)
                isValid.accept(validate(code))
            })
            .disposed(by: rx.disposeBag)
        
        input.joinButtonDidTap
            .withLatestFrom(input.roomCode)
            .map { ($0.joined(), true) }
            .bind(to: roomInfo)
            .disposed(by: rx.disposeBag)
        
        let viewTexts = localize.asDriver()
            .map { $0.joinRoomViewText }
        
        let activate = Observable.combineLatest(isFull, isValid)
            .map { $0 && $1 }
            .asDriver(onErrorJustReturn: false)
        
        let dismiss = Observable.of(input.closeButtonDidTap,
                                    input.joinButtonDidTap,
                                    input.dimmingViewDidTap).merge()
            .asSignal(onErrorJustReturn: ())
        
        return Output(viewTexts: viewTexts,
                      isActive: activate,
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
