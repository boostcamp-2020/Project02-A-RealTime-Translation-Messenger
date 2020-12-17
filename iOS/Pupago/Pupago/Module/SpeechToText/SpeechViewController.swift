//
//  SpeechViewController.swift
//  Pupago
//
//  Created by kimn on 2020/12/07.
//

import RxSwift
import RxCocoa

final class SpeechViewController: ViewController {
    
    // MARK: - IBOutlet
    
    @IBOutlet private weak var originTextView: UITextView!
    @IBOutlet private weak var translationTextView: UITextView!
    @IBOutlet private weak var assistLabel: UILabel!
    @IBOutlet private weak var micButton: UIButton!
    @IBOutlet private weak var sendButton: ActivatableButton!
    @IBOutlet private weak var closeButton: UIButton!
    @IBOutlet private weak var originConstraint: NSLayoutConstraint!
    @IBOutlet private weak var translationConstraint: NSLayoutConstraint!
    @IBOutlet private weak var buttonConstraint: NSLayoutConstraint!
    
    // MARK: - Lifecycle
    
    override func viewDidLoad() {
        super.viewDidLoad()
        bindKeyboard()
    }
    
    // MARK: Bind ViewModel
    
    override func bindViewModel() {
        super.bindViewModel()
        guard let viewModel = viewModel as? SpeechViewModel else { return }
        
        let input = SpeechViewModel.Input(originText: originTextView.rx.text.orEmpty.asObservable(),
                                          micButtonDidTap: micButton.rx.tap.asObservable(),
                                          sendButtonDidTap: sendButton.rx.tap.asObservable(),
                                          closeButtonDidTap: closeButton.rx.tap.asObservable())
        let output = viewModel.transform(input)
        
        output.viewTexts
            .bind(to: assistLabel.rx.text)
            .disposed(by: rx.disposeBag)
        
        output.originText
            .bind(to: originTextView.rx.text)
            .disposed(by: rx.disposeBag)
        
        output.translationViewState
            .bind(to: translationTextView.rx.state)
            .disposed(by: rx.disposeBag)
        
        output.isActive
            .bind(to: sendButton.rx.isActivate)
            .disposed(by: rx.disposeBag)
        
        output.isMicRunning
            .drive(onNext: {[unowned self] isMicRunning in
                let image = isMicRunning ? "micing" : "miced"
                micButton.setImage(UIImage(named: image), for: .normal)
                isMicRunning ? startPulse() : stopPulse()
            })
            .disposed(by: rx.disposeBag)
        
        output.needAssist
            .map { !$0 }
            .bind(to: assistLabel.rx.animated.fade(duration: 0.33).isHidden, originTextView.rx.isUserInteractionEnabled)
            .disposed(by: rx.disposeBag)
        
        output.dismiss
            .emit(onNext: { [unowned self] () in
                self.navigator.dismiss(sender: self)
            })
            .disposed(by: rx.disposeBag)
    }
    
}

private extension SpeechViewController {
    
    func startPulse() {
        let pulse = Pulsing(radius: 70, position: micButton.center)
        pulse.animationDuration = 1.0
        pulse.backgroundColor = UIColor.systemBlue.cgColor
        
        self.view.layer.insertSublayer(pulse, below: micButton.layer)
    }
    
    func stopPulse() {
        guard let animatingLayer = self.view.layer.sublayers?.last as? Pulsing else { return }
        animatingLayer.removeFromSuperlayer()
    }
    
}

extension SpeechViewController: KeyboardHandleable {
    
    func bindKeyboard() {
        keyboardHeight
            .filter { [unowned self] _ in translationTextView.isFirstResponder }
            .observeOn(MainScheduler.instance)
            .subscribe(onNext: { [unowned self] keyboardHeight in
                originConstraint.constant = -keyboardHeight
                translationConstraint.constant = -keyboardHeight
                buttonConstraint.constant = keyboardHeight
                view.layoutIfNeeded()
            })
            .disposed(by: rx.disposeBag)
    }
    
}
