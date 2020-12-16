//
//  JoinRoomViewController.swift
//  Pupago
//
//  Created by 김근수 on 2020/11/25.
//

import RxSwift
import RxCocoa

final class JoinRoomViewController: ViewController {
    
    // MARK: - IBOutlets
    
    @IBOutlet weak var titleLabel: UILabel!
    @IBOutlet weak var closeButton: UIButton!
    @IBOutlet weak var joinButton: Button!
    @IBOutlet var codeTextFields: [UITextField]!
    @IBOutlet weak var dimmingView: UIView!
    @IBOutlet weak var centerConstraint: NSLayoutConstraint!
    
    // MARK: - Properties
    
    let tapGesture = UITapGestureRecognizer()
    
    // MARK: - Lifecycle
    
    override func viewDidLoad() {
        super.viewDidLoad()
        bindKeyboard()
        configureTextfieldControl()
        configureGesture()
    }
    
    // MARK: - Bind ViewModel
    
    override func bindViewModel() {
        super.bindViewModel()
        guard let viewModel = viewModel as? JoinRoomViewModel else { return }
        
        let roomCode = Observable.combineLatest(codeTextFields.map { $0.rx.text.orEmpty.asObservable() })
        let input = JoinRoomViewModel.Input(roomCode: roomCode,
                                            dimmingViewDidTap: tapGesture.rx.event.map {_ in},
                                            joinButtonDidTap: joinButton.rx.tap.asObservable(),
                                            closeButtonDidTap: closeButton.rx.tap.asObservable())
        let output = viewModel.transform(input)
        
        output.viewTexts
            .drive(onNext: { [unowned self] texts in
                titleLabel.text = texts.title
                joinButton.setTitle(texts.joinButton, for: .normal)
            })
            .disposed(by: rx.disposeBag)
        
        output.isActive
            .drive(joinButton.rx.isActive)
            .disposed(by: rx.disposeBag)
        
        output.dismiss
            .emit(onNext: { [unowned self] in
                navigator.dismiss(sender: self)
            })
            .disposed(by: rx.disposeBag)
    }
    
}

private extension JoinRoomViewController {
    
    func configureTextfieldControl() {
        codeTextFields.forEach { textField in
            textField.rx.controlEvent(.editingChanged)
                .asObservable()
                .bind(onNext: { [unowned self] in
                    let idx = ((self.codeTextFields.firstIndex(of: textField) ?? 0) + 1) % 4
                    let nextResponder = self.codeTextFields[idx]
                    _ = idx == 0 ? textField.resignFirstResponder() : nextResponder.becomeFirstResponder()
                })
                .disposed(by: rx.disposeBag)
        }
    }
    
    func configureGesture() {
        dimmingView.addGestureRecognizer(tapGesture)
    }
    
}

extension JoinRoomViewController: KeyboardHandleable {
    
    func bindKeyboard() {
        keyboardHeight
            .observeOn(MainScheduler.instance)
            .subscribe(onNext: { [unowned self] keyboardHeight in
                let constraintHeight = keyboardHeight == 0 ? 0 : keyboardHeight - (view.safeAreaInsets.bottom) * 2
                
                centerConstraint.constant = -(constraintHeight) / 2
                view.layoutIfNeeded()
            })
            .disposed(by: rx.disposeBag)
    }
    
}
