//
//  ScanningViewController.swift
//  Pupago
//
//  Created by 김근수 on 2020/12/10.
//

import UIKit
import RxSwift
import RxCocoa
import VisionKit

class ScanningViewController: ViewController {
    
    @IBOutlet weak var titleLabel: UILabel!
    @IBOutlet weak var descriptionLabel: UILabel!
    @IBOutlet weak var originMessageLabel: UILabel!
    @IBOutlet weak var originLabel: UILabel!
    @IBOutlet weak var translationMessageLabel: UILabel!
    @IBOutlet weak var translationLabel: UILabel!
    @IBOutlet weak var captureImageView: UIImageView!
    @IBOutlet weak var sendButton: UIButton!
    @IBOutlet weak var scanButton: UIButton!
    @IBOutlet weak var dismissButton: UIButton!
    @IBOutlet weak var cancleButton: UIButton!
    @IBOutlet weak var seeMoreTextView: UITextView!
    @IBOutlet weak var seeMoreView: View!
    
    private let originTapGesture = UITapGestureRecognizer()
    private let translationTapGesture = UITapGestureRecognizer()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        configureGesture()
    }
    
    override func bindViewModel() {
        super.bindViewModel()
        guard let viewModel = viewModel as? ScanningViewModel else { return }
     
        let input = ScanningViewModel.Input(seeMoreText: seeMoreTextView.rx.text.orEmpty.asObservable(),
                                            originSeeMoreTap: originTapGesture.rx.event.map { _ in },
                                            translationSeeMoreTap: translationTapGesture.rx.event.map { _ in },
                                            cancleButtonTap: cancleButton.rx.tap.asObservable(),
                                            scanButtonTap: scanButton.rx.tap.asObservable(),
                                            sendButtonTap: sendButton.rx.tap.asObservable(),
                                            dismissButtonTap: dismissButton.rx.tap.asObservable())
        
        let output = viewModel.transform(input)
        
        output.viewText
            .drive(onNext: { [unowned self] texts in
                titleLabel.text = texts.title
                descriptionLabel.text = texts.description
                originMessageLabel.text = texts.originText
                translationMessageLabel.text = texts.translationText
            })
            .disposed(by: rx.disposeBag)
        
        output.activate
            .drive(onNext: { [unowned self] activate in
                self.sendButton.isUserInteractionEnabled = activate
                originLabel.isUserInteractionEnabled = activate
                translationLabel.isUserInteractionEnabled = activate
                let image = activate ? "arrow" : "arrowed"
                self.sendButton.setImage(UIImage(named: image), for: .normal)
            })
            .disposed(by: rx.disposeBag)
        
        output.originText
            .bind(to: originLabel.rx.text)
            .disposed(by: rx.disposeBag)
        
        output.translationViewState
            .bind(to: translationLabel.rx.state)
            .disposed(by: rx.disposeBag)
        
        output.seeMoreViewState
            .drive(onNext: { [unowned self] info in
                seeMoreTextView.text = info.text
            })
            .disposed(by: rx.disposeBag)
        
        output.seeMoreState
            .bind(animated: seeMoreView.rx.animated.fade(duration: 0.2).isHidden)
            .disposed(by: rx.disposeBag)
        
        output.scanedImage
            .bind(to: captureImageView.rx.image)
            .disposed(by: rx.disposeBag)
        
        output.needScanning
            .emit(onNext: { [unowned self] vc in
                present(vc, animated: true, completion: nil)
            })
            .disposed(by: rx.disposeBag)
        
        output.needAnimation
            .bind(to: scanningAnimationView.rx.isOn)
            .disposed(by: rx.disposeBag)
        
        output.dismiss
            .emit(onNext: { [unowned self] in
                navigator.dismiss(sender: self)
            })
            .disposed(by: rx.disposeBag)
    }

}

private extension ScanningViewController {
    
    func configureGesture() {
        originLabel.addGestureRecognizer(originTapGesture)
        translationLabel.addGestureRecognizer(translationTapGesture)
    }
    
}
