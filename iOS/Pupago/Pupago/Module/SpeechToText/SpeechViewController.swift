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

class SpeechViewController: ViewController {
    
    @IBOutlet weak var originTextView: UITextView!
    @IBOutlet weak var translationTextView: UITextView!
    @IBOutlet weak var assistLabel: UILabel!
    @IBOutlet weak var micButton: UIButton!
    @IBOutlet weak var sendButton: UIButton!
    @IBOutlet weak var backButton: UIButton!
    
    @IBOutlet weak var originConstraint: NSLayoutConstraint!
    @IBOutlet weak var translationConstraint: NSLayoutConstraint!
    @IBOutlet weak var buttonConstraint: NSLayoutConstraint!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        bindKeyboard()
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
