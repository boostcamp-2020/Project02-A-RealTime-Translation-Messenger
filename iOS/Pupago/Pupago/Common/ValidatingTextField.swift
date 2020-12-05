//
//  ValidatingTextField.swift
//  Pupago
//
//  Created by 김근수 on 2020/11/24.
//

import UIKit

class ValidatingTextField: UITextField {
    
    var isValid: Bool = true {
        didSet {
            configureForValid()
        }
    }
    
    private func configureForValid() {
        textColor = isValid ? .darkGray : .systemRed
    }
    
}
