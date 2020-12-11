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
    
    @IBOutlet weak var originTextView: UITextView!
    @IBOutlet weak var translationTextView: UITextView!
    @IBOutlet weak var sendButton: UIButton!
    @IBOutlet weak var scanButton: UIButton!
    @IBOutlet weak var dismissButton: UIButton!
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    override func bindViewModel() {
        super.bindViewModel()
        guard let viewModel = viewModel as? ScanningViewModel else { return }
        
        let input = ScanningViewModel.Input(originText: originTextView.rx.text.orEmpty.asObservable(),
                                            scanButtonTap: scanButton.rx.tap.asObservable(),
                                            sendButtonTap: sendButton.rx.tap.asObservable(),
                                            dismissButtonTap: dismissButton.rx.tap.asObservable())
        
        let output = viewModel.transform(input)
        
        output.originText
            .bind(to: originTextView.rx.text)
            .disposed(by: rx.disposeBag)
        
        output.translationViewState
            .bind(to: translationTextView.rx.state)
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
