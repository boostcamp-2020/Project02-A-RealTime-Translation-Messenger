//
//  ViewController.swift
//  Pupago
//
//  Created by 김근수 on 2020/11/23.
//

import UIKit
import Lottie
import AudioToolbox

class ViewController: UIViewController, Navigatable {
    
    var viewModel: ViewModel?
    var navigator: Navigator!
    
    lazy var checkAnimationView: AnimationView = {
        let view = AnimationView(name: "check")
        view.animationSpeed = 1.5
        view.frame = CGRect(x: 0, y: 0, width: 120, height: 120)
        view.center = self.view.center
        view.contentMode = .scaleAspectFill
        
        self.view.addSubview(view)
        return view
    }()
    
    lazy var scanningAnimationView: AnimationView = {
        let view = AnimationView(name: "scanning")
        view.animationSpeed = 1.0
        view.loopMode = .loop
        view.frame = CGRect(x: 0, y: 0, width: 200, height: 200)
        view.center = self.view.center
        view.contentMode = .scaleAspectFill
        
        self.view.addSubview(view)
        return view
    }()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        bindViewModel()
        registerForKeyboardNotifications()
    }
    
    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
        self.view.endEditing(true)
    }
    
    func bindViewModel() {}
    func registerForKeyboardNotifications() {}
    
}

extension ViewController {
    
    func playCheckSoundWithCompletion(completionHandler: @escaping () -> Void) {
        AudioServicesPlaySystemSoundWithCompletion(1407) {
            DispatchQueue.main.async {
                completionHandler()
            }
        }
    }
    
}
