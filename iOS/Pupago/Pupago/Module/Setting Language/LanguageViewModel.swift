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
        let selection: Observable<Localize>
        let saveTrigger: Observable<Void>
    }
    
    struct Output {
        let viewTexts: Driver<Localize.SettingLanguageViewText>
        let selected: Driver<Localize>
        let saved: Driver<NicknameViewModel>
    }
    
    func transform(_ input: Input) -> Output {
        
        input.selection
            .bind(onNext: { [weak self] localize in
                self?.localize.accept(localize)
                Application.shared.localize = localize
            })
            .disposed(by: rx.disposeBag)
        
        let viewText = localize.asDriver()
            .map { $0.languageViewText }
        
        let selected = localize.asDriver()
        
        let saved = input.saveTrigger
            .map { NicknameViewModel() }
            .asDriver(onErrorJustReturn: NicknameViewModel())
        
        return Output(viewTexts: viewText,
                      selected: selected,
                      saved: saved)
    }
}
