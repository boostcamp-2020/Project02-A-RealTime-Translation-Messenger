//
//  UITextView+Binder.swift
//  Pupago
//
//  Created by 김근수 on 2020/12/04.
//

import RxSwift
import RxCocoa

extension Reactive where Base: UITextView {
    
    var state: Binder<(text: String, isHidden: Bool)> {
        return Binder(self.base) { textView, state in
            textView.text = state.text
            textView.isHidden = state.isHidden
        }
    }
    
}
