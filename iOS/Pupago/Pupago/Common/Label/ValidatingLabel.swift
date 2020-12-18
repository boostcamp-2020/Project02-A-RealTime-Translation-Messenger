//
//  ValidatingLabel.swift
//  Pupago
//
//  Created by kimn on 2020/12/14.
//

import UIKit

@IBDesignable
class ValidatingLabel: UILabel {
    
    @IBInspectable var correctColor: UIColor = UIColor.clear
    @IBInspectable var warningColor: UIColor = UIColor.clear
    
    var isValid: Bool = true {
        didSet {
            configureForValid()
        }
    }
    
    private func configureForValid() {
        textColor = isValid ? correctColor : warningColor
    }
    
}
