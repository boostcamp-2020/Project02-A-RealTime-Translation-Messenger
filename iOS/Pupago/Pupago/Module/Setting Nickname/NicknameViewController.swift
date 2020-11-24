//
//  NicknameViewController.swift
//  Pupago
//
//  Created by 김근수 on 2020/11/23.
//

import UIKit
import RxSwift
import RxCocoa

class NicknameViewController: ViewController {
    
    @IBOutlet weak var introLabel: UILabel!
    @IBOutlet weak var descriptionLabel: UILabel!
    @IBOutlet weak var nameTextField: ValidatingTextField!
    @IBOutlet weak var startButton: Button!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        bindViewModel()
    }
    
    override func bindViewModel() {
        guard let viewModel = viewModel as? NicknameViewModel else { return }
        let nameText = nameTextField.rx.text.asObservable()
        let nextSelection = startButton.rx.tap.map { _ in }
        
        let input = NicknameViewModel.Input(nicknameText: nameText,
                                            nextTrigger: nextSelection)
        let output = viewModel.transform(input)
        
        output.viewTexts
            .drive(onNext: { [weak self] texts in
                self?.introLabel.text = texts.intro
                self?.descriptionLabel.text = texts.inputConstraint
                self?.nameTextField.placeholder = texts.inputPlaceholder
                self?.startButton.setTitle(texts.nextButton, for: .normal)
            })
            .disposed(by: rx.disposeBag)
        
        output.isNicknameValid
            .drive(onNext: { [weak self] isValid in
                self?.nameTextField.isValid = isValid
                self?.descriptionLabel.textColor = isValid ? .white : .red
            })
            .disposed(by: rx.disposeBag)
        
        output.activate
            .drive(onNext: { [weak self] activate in
                self?.startButton.isUserInteractionEnabled = activate
                self?.startButton.backgroundColor = activate ? UIColor(named: "ButtonColor") : .systemGray6
            })
            .disposed(by: rx.disposeBag)
        
        output.nextButtonSelected
            .drive(onNext: { [weak self] viewModel in
                guard let window = self?.view.window else { return }
                self?.navigator.show(segue: .chatlist(viewModel: viewModel), sender: self, transition: .rootWithNavigation(in: window))
            })
            .disposed(by: rx.disposeBag)
    }
}
