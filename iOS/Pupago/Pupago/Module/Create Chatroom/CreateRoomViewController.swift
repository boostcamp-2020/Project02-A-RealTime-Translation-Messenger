//
//  CreateRoomViewController.swift
//  Pupago
//
//  Created by 김근수 on 2020/11/25.
//

import UIKit
import RxSwift
import RxCocoa

class CreateRoomViewController: ViewController {

    @IBOutlet weak var titleLabel: UILabel!
    @IBOutlet weak var descriptionLabel: UILabel!
    @IBOutlet weak var roomTextField: ValidatingTextField!
    @IBOutlet weak var closeButton: UIButton!
    @IBOutlet weak var createButton: Button!
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }

    override func bindViewModel() {
        super.bindViewModel()
        
        guard let viewModel = viewModel as? CreateRoomViewModel else { return }
        let roomText = roomTextField.rx.text.asObservable()
        let closeSelected = closeButton.rx.tap.map { _ in }
        let createSelected = createButton.rx.tap.map { _ in }
        
        let input = CreateRoomViewModel.Input(roomNameText: roomText,
                                              createRoomTrigger: createSelected,
                                              closeRoomTrigger: closeSelected)
        let output = viewModel.transform(input)
        
        output.viewTexts
            .drive(onNext: { [weak self] texts in
                self?.titleLabel.text = texts.title
                self?.descriptionLabel.text = texts.description
                self?.createButton.setTitle(texts.createButton, for: .normal)
            })
            .disposed(by: rx.disposeBag)
        
        output.isRoomNameValid
            .drive(onNext: { [weak self] isValid in
                self?.roomTextField.isValid = isValid
                self?.descriptionLabel.textColor = isValid ? .darkGray : .red
            })
            .disposed(by: rx.disposeBag)
        
        output.activate
            .drive(onNext: { [weak self] activate in
                self?.createButton.isUserInteractionEnabled = activate
                self?.createButton.backgroundColor = activate ? UIColor(named: "ButtonColor") : .systemGray6
            })
            .disposed(by: rx.disposeBag)
        
        output.createButtonSelected
            .drive(onNext: { [weak self] viewModel in
                self?.navigator.dismiss(sender: self)
            })
            .disposed(by: rx.disposeBag)
        
        output.dismiss
            .drive(onNext: { [weak self] () in
                self?.navigator.dismiss(sender: self)
            })
            .disposed(by: rx.disposeBag)
    }

}
