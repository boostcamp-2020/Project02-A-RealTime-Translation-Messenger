//
//  ScanningViewController.swift
//  Pupago
//
//  Created by 김근수 on 2020/12/10.
//

import RxSwift
import RxCocoa
import VisionKit

final class ScanningViewController: ViewController {
    
    // MARK: - IBOutlet
    
    @IBOutlet weak var titleLabel: UILabel!
    @IBOutlet weak var descriptionLabel: UILabel!
    @IBOutlet weak var originIndicatorLabel: UILabel!
    @IBOutlet weak var originLabel: UILabel!
    @IBOutlet weak var translationIndicatorLabel: UILabel!
    @IBOutlet weak var translationLabel: UILabel!
    @IBOutlet weak var scanImageView: UIImageView!
    @IBOutlet weak var sendButton: ActivatableButton!
    @IBOutlet weak var scanButton: UIButton!
    @IBOutlet weak var cancleButton: UIButton!
    @IBOutlet weak var closeButton: UIButton!
    @IBOutlet weak var detailTextView: UITextView!
    @IBOutlet weak var detailView: View!
    @IBOutlet weak var bottomConstraint: NSLayoutConstraint!
    
    // MARK: - Properties
    
    private let originTapGesture = UITapGestureRecognizer()
    private let translationTapGesture = UITapGestureRecognizer()
    
    // MARK: - Lifecycle
    
    override func viewDidLoad() {
        super.viewDidLoad()
        configureGesture()
        bindKeyboard()
    }
    
    // MARK: Bind ViewModel
    
    override func bindViewModel() {
        super.bindViewModel()
        guard let viewModel = viewModel as? ScanningViewModel else { return }
     
        let input = ScanningViewModel.Input(detailText: detailTextView.rx.text.orEmpty.asObservable(),
                                            originDetailDidTap: originTapGesture.rx.event.map { _ in },
                                            translationDetailDidTap: translationTapGesture.rx.event.map { _ in },
                                            cancleButtonDidTap: cancleButton.rx.tap.asObservable(),
                                            scanButtonDidTap: scanButton.rx.tap.asObservable(),
                                            sendButtonDidTap: sendButton.rx.tap.asObservable(),
                                            closeButtonDidTap: closeButton.rx.tap.asObservable())
        
        let output = viewModel.transform(input)
        
        output.viewText
            .drive(onNext: { [unowned self] texts in
                titleLabel.text = texts.title
                descriptionLabel.text = texts.description
                originIndicatorLabel.text = texts.originText
                translationIndicatorLabel.text = texts.translationText
            })
            .disposed(by: rx.disposeBag)
        
        output.isActive
            .bind(to: sendButton.rx.isActivate,
                  originLabel.rx.isActivate,
                  translationLabel.rx.isActivate)
            .disposed(by: rx.disposeBag)
            
        output.originText
            .bind(to: originLabel.rx.text)
            .disposed(by: rx.disposeBag)
        
        output.translationViewState
            .bind(to: translationLabel.rx.state)
            .disposed(by: rx.disposeBag)
        
        output.detailViewState
            .map { $0.text }
            .drive(detailTextView.rx.text)
            .disposed(by: rx.disposeBag)
        
        output.needFade
            .bind(animated: detailView.rx.animated.fade(duration: 0.2).isHidden)
            .disposed(by: rx.disposeBag)
        
        output.scanedImage
            .bind(to: scanImageView.rx.image)
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

extension ScanningViewController: KeyboardHandleable {
    
    func bindKeyboard() {
        keyboardHeight
            .observeOn(MainScheduler.instance)
            .subscribe(onNext: { [unowned self] keyboardHeight in
                let constraintHeight = keyboardHeight == 0 ? 160 : keyboardHeight
                
                bottomConstraint.constant = constraintHeight
                view.layoutIfNeeded()
            })
            .disposed(by: rx.disposeBag)
    }
    
}
