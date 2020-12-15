//
//  UILabel+Binder.swift
//  Pupago
//
//  Created by kimn on 2020/12/11.
//

import RxSwift
import RxCocoa

extension Reactive where Base: UILabel {
    
    public var state: Binder<(text: String, isHidden: Bool)> {
        return Binder(self.base) { label, state in
            label.text = state.text
            label.isHidden = state.isHidden
        }
    }
    
    public var isActivate: Binder<Bool> {
        return Binder(self.base) { label, isActivate in
            label.isUserInteractionEnabled = isActivate
        }
    }
    
}

extension Reactive where Base: ValidatingLabel {
    
    var isValid: Binder<Bool> {
        return Binder(self.base) { label, isValid in
            label.isValid = isValid
        }
    }
    
}
