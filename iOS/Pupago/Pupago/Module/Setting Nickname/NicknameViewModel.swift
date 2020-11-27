//
//  NicknameViewModel.swift
//  Pupago
//
//  Created by 김근수 on 2020/11/23.
//

import Foundation
import RxSwift
import RxCocoa

final class NicknameViewModel: ViewModel, ViewModelType {
    
    struct Input {
        let nicknameText: Observable<String?>
        let saveTrigger: Observable<Void>
    }
    
    struct Output {
        let viewTexts: Driver<Localize.SettingNicknameViewText>
        let hasValidNickname: Driver<Bool>
        let activate: Driver<Bool>
        let saved: Driver<ChattingListViewModel>
    }
    
    let isEmpty = BehaviorRelay<Bool>(value: true)
    let isValid = BehaviorRelay<Bool>(value: false)
    
    func transform(_ input: Input) -> Output {
        input.nicknameText
            .map { $0?.isEmpty ?? true }
            .bind(to: isEmpty)
            .disposed(by: rx.disposeBag)
        
        input.nicknameText
            .map { self.validate(nickname: $0 ?? "") }
            .bind(to: isValid)
            .disposed(by: rx.disposeBag)
        
        let viewText = localize.asDriver()
            .map { $0.nicknameViewText }
        
        let validate = Observable.zip(isEmpty, isValid)
            .map { $0 || $1 }
            .asDriver(onErrorJustReturn: false)
        
        let activate = Observable.zip(isEmpty, isValid)
            .map { !$0 && $1 }
            .asDriver(onErrorJustReturn: false)
        
        input.saveTrigger
            .withLatestFrom(input.nicknameText)
            .subscribe(onNext: { text in
                Application.shared.userName = text ?? ""
            })
            .disposed(by: rx.disposeBag)
        
        let saved = input.saveTrigger
            .map { ChattingListViewModel() }
            .asDriver(onErrorJustReturn: ChattingListViewModel())
        
        return Output(viewTexts: viewText,
                      hasValidNickname: validate,
                      activate: activate,
                      saved: saved)
    }
    
}

private extension NicknameViewModel {
    
    private func validate(nickname: String) -> Bool {
        guard nickname.count <= 12 && nickname.count >= 2,
              RegexManager.validate(of: nickname, for: .nickname)
        else { return false }
        
        return true
    }
    
}
