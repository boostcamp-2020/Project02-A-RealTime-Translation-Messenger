//
//  UIButton+Binder.swift
//  Pupago
//
//  Created by kimn on 2020/12/14.
//

import RxSwift
import RxCocoa

extension Reactive where Base: Button {
    
    var isActive: Binder<Bool> {
        return Binder(self.base) { button, isActive in
            button.isUserInteractionEnabled = isActive
            button.backgroundColor = isActive ? UIColor(named: "ButtonColor") : .systemGray6
        }
    }
    
}
