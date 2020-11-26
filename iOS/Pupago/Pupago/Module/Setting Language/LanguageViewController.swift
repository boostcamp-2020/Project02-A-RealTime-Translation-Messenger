//
//  ViewController.swift
//  Pupago
//
//  Created by 김근수 on 2020/11/19.
//

import UIKit
import RxSwift
import RxCocoa

class LanguageViewController: ViewController {
    @IBOutlet weak var introLabel: UILabel!
    @IBOutlet weak var descriptionLabel: UILabel!
    @IBOutlet weak var engButton: SelectableButton!
    @IBOutlet weak var korButton: SelectableButton!
    @IBOutlet weak var nextButton: Button!
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    override func bindViewModel() {
        super.bindViewModel()

        guard let viewModel = viewModel as? LanguageViewModel else { return }
        let engSelected = engButton.rx.tap.map { Localize.english }
        let korSelected = korButton.rx.tap.map { Localize.korean }
        let languageSelected = Observable.of(engSelected, korSelected).merge()
        let nextSelection = nextButton.rx.tap.map { _ in }
        
        let input = LanguageViewModel.Input(languageChangeTrigger: languageSelected,
                                            nextTrigger: nextSelection)
        
        let output = viewModel.transform(input)

        output.viewTexts
            .drive(onNext: { [weak self] texts in
                self?.introLabel.text = texts.intro
                self?.descriptionLabel.text = texts.description
                self?.nextButton.setTitle(texts.nextButton, for: .normal)
            })
            .disposed(by: rx.disposeBag)
        
        output.languageSelected
            .drive(onNext: { [weak self] localize in
                let korSelected = localize == .korean
                self?.korButton.isSelected = korSelected
                self?.engButton.isSelected = !korSelected
            })
            .disposed(by: rx.disposeBag)
        
        output.nextButtonSelected
            .drive(onNext: { [weak self] viewModel in
                guard let window = self?.view.window else { return }
                self?.navigator.show(segue: .nickname(viewModel: viewModel), sender: self, transition: .root(in: window))
            })
            .disposed(by: rx.disposeBag)
    }
    
}
