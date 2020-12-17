//
//  CreateRoomViewController.swift
//  Pupago
//
//  Created by 김근수 on 2020/11/25.
//

import RxSwift
import RxCocoa

final class CreateRoomViewController: ViewController {
    
    @IBOutlet private weak var titleLabel: UILabel!
    @IBOutlet private weak var descriptionLabel: ValidatingLabel!
    @IBOutlet private weak var roomTextField: ValidatingTextField!
    @IBOutlet private weak var closeButton: UIButton!
    @IBOutlet private weak var createButton: Button!
    @IBOutlet private weak var privateSegment: SegmentControl!
    @IBOutlet private weak var dimmingView: UIView!
    @IBOutlet private weak var centerConstraint: NSLayoutConstraint!
    
    // MARK: - Property
    
    private let tapGesture = UITapGestureRecognizer()
    
    // MARK: - Object Lifecycle
    
    override func viewDidLoad() {
        super.viewDidLoad()
        bindKeyboard()
        configureGesture()
    }
    
    // MARK: - Bind ViewModel
  
    override func bindViewModel() {
        super.bindViewModel()
        guard let viewModel = viewModel as? CreateRoomViewModel else { return }
      
        let input = CreateRoomViewModel.Input(roomName: roomTextField.rx.text.orEmpty.asObservable(),
                                              privateDidSelect: privateSegment.rx.selectedSegmentIndex.map { $0 == 1 },
                                              createButtonTap: createButton.rx.tap.asObservable(),
                                              cancelButtonTap: closeButton.rx.tap.asObservable(),
                                              dimmingViewDidTap: tapGesture.rx.event.map {_ in})
        let output = viewModel.transform(input)
        
        output.viewTexts
            .drive(onNext: { [unowned self] texts in
                self.titleLabel.text = texts.title
                self.descriptionLabel.text = texts.description
                self.privateSegment.setTitle(texts.publicRoom, forSegmentAt: 0)
                self.privateSegment.setTitle(texts.privateRoom, forSegmentAt: 1)
                self.createButton.setTitle(texts.createButton, for: .normal)
            })
            .disposed(by: rx.disposeBag)
        
        output.isValidRoomName
            .bind(to: descriptionLabel.rx.isValid, roomTextField.rx.isValid)
            .disposed(by: rx.disposeBag)
        
        output.needShake
            .filter { $0 }
            .bind(animated: roomTextField.rx.animated.tick(duration: 0.33).isSelected)
            .disposed(by: rx.disposeBag)
        
        output.isActive
            .drive(createButton.rx.isActive)
            .disposed(by: rx.disposeBag)
        
        output.dismiss
            .emit(onNext: { [unowned self] () in
                self.navigator.dismiss(sender: self)
            })
            .disposed(by: rx.disposeBag)
        
    }
    
}

private extension CreateRoomViewController {
    
    func configureGesture() {
        dimmingView.addGestureRecognizer(tapGesture)
    }
    
}

extension CreateRoomViewController: KeyboardHandleable {
    
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
