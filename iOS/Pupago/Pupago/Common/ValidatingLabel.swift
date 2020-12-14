//
//  ValidatingLabel.swift
//  Pupago
//
//  Created by kimn on 2020/12/14.
//

import UIKit

class ValidatingLabel: UILabel {
    
    var isValid: Bool = true {
        didSet {
            configureForValid()
        }
    }
    
    private func configureForValid() {
        textColor = isValid ? .white : .systemRed
    }
    
}
