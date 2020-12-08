//
//  SpeechViewController.swift
//  Pupago
//
//  Created by kimn on 2020/12/07.
//

import UIKit

class SpeechViewController: ViewController {
    
    @IBOutlet weak var originTextView: UITextView!
    @IBOutlet weak var translationTextView: UITextView!
    @IBOutlet weak var micButton: UIButton!
    @IBOutlet weak var sendButton: UIButton!
    @IBOutlet weak var backButton: UIButton!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        configureButton()
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
        
        output.activate
            .drive(onNext: {[unowned self] activate in
                let image = activate ? "micing" : "miced"
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
                self.sendButton.tintColor = available ? UIColor(named: "BlueColor") : .lightGray
            })
            .disposed(by: rx.disposeBag)
        
        output.dismiss
            .drive(onNext: { [unowned self] () in
                self.navigator.dismiss(sender: self)
            })
            .disposed(by: rx.disposeBag)
    }

}

extension SpeechViewController {
    private func configureButton() {
        let largeConfig = UIImage.SymbolConfiguration(pointSize: 40, weight: .regular, scale: .medium)
        
        let largeBoldDoc = UIImage(systemName: "arrow.up.message.fill", withConfiguration: largeConfig)

        sendButton.setImage(largeBoldDoc, for: .normal)
    }
}
