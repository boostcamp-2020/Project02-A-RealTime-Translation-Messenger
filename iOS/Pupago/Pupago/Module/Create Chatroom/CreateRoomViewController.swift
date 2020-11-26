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

    @IBOutlet weak var closeButton: UIButton!
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }

    override func bindViewModel() {
        super.bindViewModel()
        
        guard let viewModel = viewModel as? CreateRoomViewModel else { return }
        
        let closeSelected = closeButton.rx.tap.map { _ in }
        
        let input = CreateRoomViewModel.Input(closeRoomTrigger: closeSelected)
        
        let output = viewModel.transform(input)
        
        output.dismiss
            .drive(onNext: { [weak self] () in
                self?.navigator.dismiss(sender: self)
            })
            .disposed(by: rx.disposeBag)
    }

}
