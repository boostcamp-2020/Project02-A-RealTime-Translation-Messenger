//
//  LanguageViewModel.swift
//  Pupago
//
//  Created by 김근수 on 2020/11/23.
//

import Foundation
import RxSwift
import RxCocoa

class LanguageViewModel: ViewModel, ViewModelType {
    
    struct Input {
        let englishTrigger: Observable<Void>
        let koreanTrigger: Observable<Void>
        let nextTrigger: Observable<Void>
    }
    
    struct Output {
        let viewTexts: Driver<Localize.SettingLanguageViewText>
        let korSelected: Driver<Bool>
        let engSelected: Driver<Bool>
        let nextButtonSelected: Driver<NicknameViewModel>
    }
    
    func transform(_ input: Input) -> Output {
        
        input.englishTrigger
            .map { Localize.english }
            .bind(to: localize)
            .disposed(by: rx.disposeBag)
        
        input.koreanTrigger
            .map { Localize.korean }
            .bind(to: localize)
            .disposed(by: rx.disposeBag)
        
        let viewText = localize.asDriver()
            .map { $0.languageViewText }
        
        let korSelected = localize.asDriver()
            .map { $0 == .korean }
        
        let engSelected = localize.asDriver()
            .map { $0 == .english }
        
        let nextButtonSelected = input.nextTrigger
            .map { NicknameViewModel() }
            .asDriver(onErrorJustReturn: NicknameViewModel())
        
        return Output(viewTexts: viewText,
                      korSelected: korSelected,
                      engSelected: engSelected,
                      nextButtonSelected: nextButtonSelected)
    }
}
