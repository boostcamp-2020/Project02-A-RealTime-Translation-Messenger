//
//  KeyboardControllable.swift
//  Pupago
//
//  Created by kimn on 2020/12/15.
//

import RxSwift

protocol KeyboardHandleable {
    var keyboardHeight: Observable<CGFloat> { get }
    func bindKeyboard()
}

extension KeyboardHandleable {
    var keyboardHeight: Observable<CGFloat> {
        return Observable
            .from([
                NotificationCenter.default.rx.notification(UIResponder.keyboardWillShowNotification)
                    .map { notification -> CGFloat in
                        (notification.userInfo?[UIResponder.keyboardFrameEndUserInfoKey] as? NSValue)?.cgRectValue.height ?? 0
                    },
                    NotificationCenter.default.rx.notification(UIResponder.keyboardWillHideNotification)
                    .map { _ -> CGFloat in 0 }
                ])
            .merge()
    }
}
