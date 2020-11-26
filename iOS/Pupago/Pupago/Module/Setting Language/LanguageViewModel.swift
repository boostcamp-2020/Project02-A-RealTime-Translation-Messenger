//
//  LanguageViewModel.swift
//  Pupago
//
//  Created by 김근수 on 2020/11/23.
//

import Foundation
import RxSwift
import RxCocoa

final class LanguageViewModel: ViewModel, ViewModelType {
    
    struct Input {
        let languageChangeTrigger: Observable<Localize>
        let nextTrigger: Observable<Void>
    }
    
    struct Output {
        let viewTexts: Driver<Localize.SettingLanguageViewText>
        let languageSelected: Driver<Localize>
        let nextButtonSelected: Driver<NicknameViewModel>
    }
    
    func transform(_ input: Input) -> Output {
        
        input.languageChangeTrigger
            .bind(onNext: { [weak self] localize in
                self?.localize.accept(localize)
                Application.shared.localize = localize
            })
            .disposed(by: rx.disposeBag)
        
        let viewText = localize.asDriver()
            .map { $0.languageViewText }
        
        let languageSelected = localize.asDriver()
        
        let nextButtonSelected = input.nextTrigger
            .map { NicknameViewModel() }
            .asDriver(onErrorJustReturn: NicknameViewModel())
        
        return Output(viewTexts: viewText,
                      languageSelected: languageSelected,
                      nextButtonSelected: nextButtonSelected)
    }
}
