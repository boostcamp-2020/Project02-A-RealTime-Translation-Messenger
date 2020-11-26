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
        let engSelection = engButton.rx.tap.map { Localize.english }
        let korSelection = korButton.rx.tap.map { Localize.korean }
        let selection = Observable.of(engSelection, korSelection).merge()
        let saveTrigger = nextButton.rx.tap.map { _ in }
        
        let input = LanguageViewModel.Input(selection: selection,
                                            saveTrigger: saveTrigger)
        
        let output = viewModel.transform(input)
        
        output.viewTexts
            .drive(onNext: { [unowned self] texts in
                self.introLabel.text = texts.intro
                self.descriptionLabel.text = texts.description
                self.nextButton.setTitle(texts.nextButton, for: .normal)
            })
            .disposed(by: rx.disposeBag)
        
        output.selected
            .drive(onNext: { [unowned self] localize in
                let korSelected = localize == .korean
                self.korButton.isSelected = korSelected
                self.engButton.isSelected = !korSelected
            })
            .disposed(by: rx.disposeBag)
        
        output.saved
            .drive(onNext: { [unowned self] viewModel in
                guard let window = self.view.window else { return }
                self.navigator.show(segue: .nickname(viewModel: viewModel), sender: self, transition: .root(in: window))
            })
            .disposed(by: rx.disposeBag)
    }
    
}
