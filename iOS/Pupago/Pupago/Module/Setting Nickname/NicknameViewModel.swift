//
//  NicknameViewModel.swift
//  Pupago
//
//  Created by 김근수 on 2020/11/23.
//

import RxSwift
import RxCocoa

final class NicknameViewModel: ViewModel, ViewModelType {
    
    // MARK: - Input
    
    struct Input {
        let nickname: Observable<String>
        let startButtonDidTap: Observable<Void>
    }
    
    // MARK: - Output
    
    struct Output {
        let viewTexts: Driver<Localize.SettingNicknameViewText>
        let isValidNickname: Observable<Bool>
        let isActive: Driver<Bool>
        let needShake: Observable<Bool>
        let showChattingListView: Signal<ChattingListViewModel>
    }
    
    // MARK: - State
    
    let isEmpty = BehaviorRelay<Bool>(value: true)
    let isValid = BehaviorRelay<Bool>(value: false)
    let nickname = BehaviorRelay<String>(value: "")
    let needShake = BehaviorRelay<Bool>(value: false)
    
    func transform(_ input: Input) -> Output {
        
        input.nickname
            .subscribe(onNext: { [unowned self] in
                isEmpty.accept($0.isEmpty)
                isValid.accept(validate(nickname: $0))
                nickname.accept($0)
                needShake.accept(validateLength(nickname: $0))
            })
            .disposed(by: rx.disposeBag)
        
        let viewText = localize.asDriver()
            .map { $0.nicknameViewText }
        
        let isValidNickname = Observable.combineLatest(isEmpty, isValid)
            .map { $0 || $1 }
        
        let isActive = Observable.combineLatest(isEmpty, isValid)
            .map { !$0 && $1 }
            .asDriver(onErrorJustReturn: false)
        
        let showChattingListView = input.startButtonDidTap
            .asSignal(onErrorJustReturn: ())
            .map { [unowned self] () -> ChattingListViewModel in
                saveNickname(nickname: nickname.value)
                return ChattingListViewModel()
            }
            
        return Output(viewTexts: viewText,
                      isValidNickname: isValidNickname,
                      isActive: isActive,
                      needShake: needShake.asObservable(),
                      showChattingListView: showChattingListView)
    }

}

private extension NicknameViewModel {
    
    private func validate(nickname: String) -> Bool {
        guard nickname.count >= 2,
              RegexManager.validate(of: nickname, for: .nickname)
        else { return false }
        
        return true
    }
    
    private func validateLength(nickname: String) -> Bool {
        guard nickname.count == 12 else { return false }
        
        return true
    }
    
    private func saveNickname(nickname: String) {
        Application.shared.userName = nickname
    }
    
}
