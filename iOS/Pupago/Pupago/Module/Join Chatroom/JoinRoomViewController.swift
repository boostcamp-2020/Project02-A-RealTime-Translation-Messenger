//
//  JoinRoomViewController.swift
//  Pupago
//
//  Created by 김근수 on 2020/11/25.
//

import UIKit
import RxSwift
import RxCocoa

final class JoinRoomViewController: ViewController {
    
    @IBOutlet weak var titleLabel: UILabel!
    @IBOutlet weak var closeButton: UIButton!
    @IBOutlet weak var joinButton: Button!
    @IBOutlet var codeTextFields: [UITextField]!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupTextFieldControls()
    }
    
    override func bindViewModel() {
        super.bindViewModel()
        
        guard let viewModel = viewModel as? JoinRoomViewModel else { return }
        
        let closeSelected = closeButton.rx.tap.map { _ in }
        let roomCode: Observable<[String]> =  {
            let observers = codeTextFields
                .map { $0.rx.text.orEmpty.asObservable() }
            return Observable.combineLatest(observers)
        }()
        
        let input = JoinRoomViewModel.Input(roomCode: roomCode,
                                            closeRoomTrigger: closeSelected)
        
        let output = viewModel.transform(input)
        
        output.viewTexts
            .drive(onNext: { [weak self] texts in
                self?.titleLabel.text = texts.title
                self?.joinButton.setTitle(texts.joinButton, for: .normal)
            })
            .disposed(by: rx.disposeBag)
        
        output.activate
            .drive(onNext: { [weak self] activate in
                self?.joinButton.isUserInteractionEnabled = activate
                self?.joinButton.backgroundColor = activate ? UIColor(named: "ButtonColor") : .systemGray6
            })
            .disposed(by: rx.disposeBag)
        
        output.dismiss
            .drive(onNext: { [weak self] () in
                self?.navigator.dismiss(sender: self)
            })
            .disposed(by: rx.disposeBag)
    }
    
}

private extension JoinRoomViewController {
    
    func setupTextFieldControls() {
        codeTextFields.forEach { textField in
            textField.rx.controlEvent(.editingChanged)
                .asObservable()
                .bind(onNext: { [weak self] in
                    let idx = ((self?.codeTextFields.firstIndex(of: textField) ?? 0) + 1) % 4
                    let nextResponder = self?.codeTextFields[idx]
                    _ = idx == 0 ? textField.resignFirstResponder() : nextResponder?.becomeFirstResponder()
                })
                .disposed(by: rx.disposeBag)
        }
    }
    
}
