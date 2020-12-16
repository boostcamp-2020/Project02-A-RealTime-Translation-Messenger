//
//  ViewController.swift
//  Pupago
//
//  Created by 김근수 on 2020/11/19.
//

import RxSwift
import RxCocoa

final class LanguageViewController: ViewController {
    
    // MARK: - IBOutlet
    
    @IBOutlet weak var introLabel: UILabel!
    @IBOutlet weak var descriptionLabel: UILabel!
    @IBOutlet weak var engButton: SelectableButton!
    @IBOutlet weak var korButton: SelectableButton!
    @IBOutlet weak var nextButton: Button!
    
    
    // MARK: - Lifecycle
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    // MARK: - Bind ViewModel
    
    override func bindViewModel() {
        super.bindViewModel()
        guard let viewModel = viewModel as? LanguageViewModel else { return }
        
        let input = LanguageViewModel.Input(engButtonDidTap: engButton.rx.tap.asObservable(),
                                            korButtonDidTap: korButton.rx.tap.asObservable(),
                                            nextButtonDidTap: nextButton.rx.tap.asObservable())
        let output = viewModel.transform(input)
        
        output.viewTexts
            .asObservable()
            .map { $0.intro }
            .bind(animated: introLabel.rx.animated.fade(duration: 0.33).text)
            .disposed(by: rx.disposeBag)
        
        output.viewTexts
            .asObservable()
            .map { $0.description }
            .bind(animated: descriptionLabel.rx.animated.fade(duration: 0.33).text)
            .disposed(by: rx.disposeBag)
        
        output.viewTexts
            .drive(onNext: { [unowned self] texts in
                nextButton.setTitle(texts.nextButton, for: .normal)
            })
            .disposed(by: rx.disposeBag)
        
        output.isKorean
            .drive(onNext: { [unowned self] in
                korButton.isSelected = $0
                engButton.isSelected = !$0
            })
            .disposed(by: rx.disposeBag)
        
        output.showNicknameView
            .emit(onNext: { [unowned self] viewModel in
                guard let window = self.view.window else { return }
                nextButton.isUserInteractionEnabled = false
                checkAnimationView.play { _ in
                    playCheckSoundWithCompletion {
                        navigator.show(segue: .nickname(viewModel: viewModel), sender: self, transition: .root(in: window))
                    }
                }
            })
            .disposed(by: rx.disposeBag)
    }
    
}
