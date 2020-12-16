//
//  ValidatingTextField.swift
//  Pupago
//
//  Created by 김근수 on 2020/11/24.
//

import UIKit

@IBDesignable
class ValidatingTextField: UITextField {
    
    @IBInspectable var maxLength: Int = 12
        
    var stringValue: String { return text ?? "" }
    
    override func awakeFromNib() {
        super.awakeFromNib()
        addTarget(self, action: #selector(editingChanged), for: .editingChanged)
        editingChanged(sender: self)
    }
    
    @objc func editingChanged(sender: UITextField) {
        if text?.count ?? 0 > maxLength {
            text = String(stringValue.prefix(maxLength))
        }
    }

    var isValid: Bool = true {
        didSet {
            configureForValid()
        }
    }
    
    private func configureForValid() {
        textColor = isValid ? .darkGray : .systemRed
    }
    
}
