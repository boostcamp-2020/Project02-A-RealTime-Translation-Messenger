//
//  ScanningViewController.swift
//  Pupago
//
//  Created by 김근수 on 2020/12/10.
//

import RxSwift
import RxCocoa

final class ScanningViewController: ViewController {
    
    // MARK: - IBOutlet
    
    @IBOutlet private weak var titleLabel: UILabel!
    @IBOutlet private weak var descriptionLabel: UILabel!
    @IBOutlet private weak var originIndicatorLabel: UILabel!
    @IBOutlet private weak var originLabel: UILabel!
    @IBOutlet private weak var translationIndicatorLabel: UILabel!
    @IBOutlet private weak var translationLabel: UILabel!
    @IBOutlet private weak var scanImageView: UIImageView!
    @IBOutlet private weak var sendButton: ActivatableButton!
    @IBOutlet private weak var scanButton: UIButton!
    @IBOutlet private weak var cancleButton: UIButton!
    @IBOutlet private weak var closeButton: UIButton!
    @IBOutlet private weak var detailTextView: UITextView!
    @IBOutlet private weak var detailView: View!
    @IBOutlet private weak var bottomConstraint: NSLayoutConstraint!
    
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
