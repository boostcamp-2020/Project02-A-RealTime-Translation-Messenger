//
//  SpeechViewController.swift
//  Pupago
//
//  Created by kimn on 2020/12/07.
//

import UIKit
import RxSwift
import RxCocoa
import RxAnimated

final class SpeechViewController: ViewController {
    
    @IBOutlet weak var originTextView: UITextView!
    @IBOutlet weak var translationTextView: UITextView!
    @IBOutlet weak var assistLabel: UILabel!
    @IBOutlet weak var micButton: UIButton!
    @IBOutlet weak var sendButton: UIButton!
    @IBOutlet weak var backButton: UIButton!
    
    @IBOutlet weak var originConstraint: NSLayoutConstraint!
    @IBOutlet weak var translationConstraint: NSLayoutConstraint!
    @IBOutlet weak var buttonConstraint: NSLayoutConstraint!
    
    private var keyboardShown: Bool = false
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    override func bindViewModel() {
        super.bindViewModel()
        
        guard let viewModel = viewModel as? SpeechViewModel else { return }
        
        let micTrigger = micButton.rx.tap.asObservable()
        let sendTrigger = sendButton.rx.tap.asObservable()
        let backTrigger = backButton.rx.tap.asObservable()
        let originText = originTextView.rx.text.orEmpty.asObservable()
        
        let input = SpeechViewModel.Input(micTrigger: micTrigger,
                                          sendTrigger: sendTrigger,
                                          backTrigger: backTrigger,
                                          originText: originText)
        
        let output = viewModel.transform(input)
        
        output.viewTexts
            .bind(to: assistLabel.rx.text)
            .disposed(by: rx.disposeBag)
        
        output.activate
            .drive(onNext: {[unowned self] activate in
                let image = activate ? "micing" : "miced"
                activate ? startPulse() : stopPulse()
                self.micButton.setImage(UIImage(named: image), for: .normal)
            })
            .disposed(by: rx.disposeBag)
        
        output.originText
            .bind(to: originTextView.rx.text)
            .disposed(by: rx.disposeBag)
        
        output.translationViewState
            .bind(to: translationTextView.rx.state)
            .disposed(by: rx.disposeBag)
        
        output.available
            .drive(onNext: { [unowned self] available in
                self.sendButton.isUserInteractionEnabled = available
                let image = available ? "arrow" : "arrowed"
                self.sendButton.setImage(UIImage(named: image), for: .normal)
            })
            .disposed(by: rx.disposeBag)
        
        output.assitable
            .bind(animated: assistLabel.rx.animated.fade(duration: 0.33).isHidden)
            .disposed(by: rx.disposeBag)
        
        output.dismiss
            .drive(onNext: { [unowned self] () in
                self.navigator.dismiss(sender: self)
            })
            .disposed(by: rx.disposeBag)
    }
    
    override func registerForKeyboardNotifications() {
        super.registerForKeyboardNotifications()
        
        NotificationCenter.default
            .addObserver(self, selector: #selector(keyboardWillShow),
                               name: UIResponder.keyboardWillShowNotification,
                               object: nil)
        NotificationCenter.default
            .addObserver(self, selector: #selector(keyboardWillHide),
                               name: UIResponder.keyboardWillHideNotification,
                               object: nil)
    }
    
}

extension SpeechViewController {
    
    private func startPulse() {
        let pulse = Pulsing(radius: 70, position: micButton.center)
        pulse.animationDuration = 1.0
        pulse.backgroundColor = UIColor.systemBlue.cgColor
        
        self.view.layer.insertSublayer(pulse, below: micButton.layer)
    }
    
    private func stopPulse() {
        guard let animatingLayer = self.view.layer.sublayers?.last as? Pulsing else { return }
        animatingLayer.removeFromSuperlayer()
    }
    
    @objc func keyboardWillShow(notification: NSNotification) {
        let responder = translationTextView.isFirstResponder
        if responder, let keyboardSize = (notification.userInfo?[UIResponder.keyboardFrameEndUserInfoKey] as? NSValue)?.cgRectValue {
            if keyboardSize.height == 0.0 || keyboardShown { return }
            
            UIView.animate(withDuration: 0) {
                let bottomPadding = self.view.safeAreaInsets.bottom
                self.originConstraint.constant -= (keyboardSize.height - bottomPadding)
                self.translationConstraint.constant -= (keyboardSize.height - bottomPadding)
                self.buttonConstraint.constant += (keyboardSize.height - bottomPadding)
                self.keyboardShown = true
                self.view.layoutIfNeeded()
            }
        }
    }
    
    @objc func keyboardWillHide(notification: NSNotification) {
        if !keyboardShown { return }
            
        UIView.animate(withDuration: 0) {
            self.originConstraint.constant = 0
            self.translationConstraint.constant = 0
            self.buttonConstraint.constant = 32
            self.keyboardShown = false
            self.view.layoutIfNeeded()
        }
    }
    
}
