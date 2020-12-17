//
//  NicknameViewController.swift
//  Pupago
//
//  Created by 김근수 on 2020/11/23.
//

import RxSwift
import RxCocoa

final class NicknameViewController: ViewController {
    
    // MARK: - IBOutlet
    
    @IBOutlet private weak var introLabel: UILabel!
    @IBOutlet private weak var descriptionLabel: ValidatingLabel!
    @IBOutlet private weak var nameTextField: ValidatingTextField!
    @IBOutlet private weak var startButton: Button!
    
    // MARK: - Lifecycle
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    // MARK: - Bind ViewModel
    
    override func bindViewModel() {
        super.bindViewModel()
        guard let viewModel = viewModel as? NicknameViewModel else { return }
        
        let input = NicknameViewModel.Input(nickname: nameTextField.rx.text.orEmpty.asObservable(),
                                            startButtonDidTap: startButton.rx.tap.asObservable())
        let output = viewModel.transform(input)
        
        output.viewTexts
            .drive(onNext: { [unowned self] texts in
                introLabel.text = texts.intro
                descriptionLabel.text = texts.inputConstraint
                nameTextField.placeholder = texts.inputPlaceholder
                startButton.setTitle(texts.nextButton, for: .normal)
            })
            .disposed(by: rx.disposeBag)
        
        output.isValidNickname
            .bind(to: nameTextField.rx.isValid, descriptionLabel.rx.isValid)
            .disposed(by: rx.disposeBag)
        
        output.isActive
            .drive(startButton.rx.isActive)
            .disposed(by: rx.disposeBag)
        
        output.needShake
            .filter { $0 }
            .bind(animated: nameTextField.rx.animated.tick(duration: 0.33).isSelected)
            .disposed(by: rx.disposeBag)
        
        output.showChattingListView
            .emit(onNext: { [unowned self] viewModel in
                guard let window = self.view.window else { return }
                startButton.isUserInteractionEnabled = false
                checkAnimationView.play { _ in
                    playCheckSoundWithCompletion {
                        self.navigator.show(segue: .chatlist(viewModel: viewModel), sender: self, transition: .rootWithNavigation(in: window))
                    }
                }
            })
            .disposed(by: rx.disposeBag)
    }
    
}
