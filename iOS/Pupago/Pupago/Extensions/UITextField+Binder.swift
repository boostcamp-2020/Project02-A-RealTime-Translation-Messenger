//
//  UITextField+Binder.swift
//  Pupago
//
//  Created by kimn on 2020/12/14.
//

import RxSwift
import RxCocoa

extension Reactive where Base: ValidatingTextField {
    
    var isValid: Binder<Bool> {
        return Binder(self.base) { textField, isValid in
            textField.isValid = isValid
        }
    }
    
}
