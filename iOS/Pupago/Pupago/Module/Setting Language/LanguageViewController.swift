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
        
        bindViewModel()
    }
    
    override func bindViewModel() {
        super.bindViewModel()

        guard let viewModel = viewModel as? LanguageViewModel else { return }
        let engSelected = engButton.rx.tap.map { _ in }
        let korSelected = korButton.rx.tap.map { _ in }
        let nextSelection = nextButton.rx.tap.map { _ in }
        
        let input = LanguageViewModel.Input(englishTrigger: engSelected,
                                            koreanTrigger: korSelected,
                                            nextTrigger: nextSelection)
        
        let output = viewModel.transform(input)

        output.viewTexts
            .drive(onNext: { [weak self] texts in
                self?.introLabel.text = texts.intro
                self?.descriptionLabel.text = texts.description
                self?.nextButton.setTitle(texts.nextButton, for: .normal)
            })
            .disposed(by: rx.disposeBag)
        
        output.korSelected
            .drive(korButton.rx.isSelected)
            .disposed(by: rx.disposeBag)
        
        output.engSelected
            .drive(engButton.rx.isSelected)
            .disposed(by: rx.disposeBag)
        
        output.nextButtonSelected
            .drive(onNext: { [weak self] viewModel in
                guard let window = self?.view.window else { return }
                self?.navigator.show(segue: .nickname(viewModel: viewModel), sender: self, transition: .root(in: window))
            })
            .disposed(by: rx.disposeBag)
    }
    
}
