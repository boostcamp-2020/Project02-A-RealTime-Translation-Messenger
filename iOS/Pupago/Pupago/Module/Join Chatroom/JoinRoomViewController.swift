//
//  JoinRoomViewController.swift
//  Pupago
//
//  Created by 김근수 on 2020/11/25.
//

import UIKit

class JoinRoomViewController: ViewController {

    @IBOutlet weak var closeButton: UIButton!
    
    override func viewDidLoad() {
        super.viewDidLoad()

    }
    
    override func bindViewModel() {
        super.bindViewModel()
        
        guard let viewModel = viewModel as? JoinRoomViewModel else { return }
        
        let closeSelected = closeButton.rx.tap.map { _ in }
        
        let input = JoinRoomViewModel.Input(closeRoomTrigger: closeSelected)
        
        let output = viewModel.transform(input)
        
        output.dismiss
            .drive(onNext: { [weak self] () in
                self?.navigator.dismiss(sender: self)
            })
            .disposed(by: rx.disposeBag)
    }
    
}
