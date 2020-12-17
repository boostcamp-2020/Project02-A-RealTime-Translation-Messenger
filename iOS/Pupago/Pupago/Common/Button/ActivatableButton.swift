//
//  ActivatableButton.swift
//  Pupago
//
//  Created by kimn on 2020/12/15.
//

import UIKit

class ActivatableButton: UIButton {
    
    var isActivate: Bool = false {
        didSet {
            configureForActivate()
        }
    }
    
    private func configureForActivate() {
        let image = isActivate ? "arrow" : "arrowed"
        
        isUserInteractionEnabled = isActivate
        setImage(UIImage(named: image), for: .normal)
    }
    
}
