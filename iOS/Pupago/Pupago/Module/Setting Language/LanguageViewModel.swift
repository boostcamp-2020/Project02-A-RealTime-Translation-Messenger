//
//  LanguageViewModel.swift
//  Pupago
//
//  Created by 김근수 on 2020/11/23.
//

import RxSwift
import RxCocoa

final class LanguageViewModel: ViewModel, ViewModelType {
    
    // MARK: - Input
    
    struct Input {
        let engButtonDidTap: Observable<Void>
        let korButtonDidTap: Observable<Void>
        let nextButtonDidTap: Observable<Void>
    }
    
    // MARK: - Output
    
    struct Output {
        let viewTexts: Driver<Localize.SettingLanguageViewText>
        let isKorean: Driver<Bool>
        let showNicknameView: Signal<NicknameViewModel>
    }
    
    // MARK: - Transform
    
    func transform(_ input: Input) -> Output {
        
        input.engButtonDidTap
            .map { Localize.english }
            .bind(to: localize)
            .disposed(by: rx.disposeBag)
        
        input.korButtonDidTap
            .map { Localize.korean }
            .bind(to: localize)
            .disposed(by: rx.disposeBag)
        
        let viewText = localize.asDriver()
            .map { $0.languageViewText }
        
        let isKorean = localize.asDriver()
            .map { $0 == .korean }
        
        let showNicknameView = input.nextButtonDidTap.asSignal(onErrorJustReturn: ())
            .map { [unowned self] () -> NicknameViewModel in
                saveLocalize()
                return NicknameViewModel()
            }
        
        return Output(viewTexts: viewText,
                      isKorean: isKorean,
                      showNicknameView: showNicknameView)
    }
    
}

private extension LanguageViewModel {
    
    func saveLocalize() {
        Application.shared.localize = localize.value
    }
    
}
