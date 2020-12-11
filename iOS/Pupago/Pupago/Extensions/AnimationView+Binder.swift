//
//  AnimationView+Binder.swift
//  Pupago
//
//  Created by 김근수 on 2020/12/11.
//

import Lottie
import RxSwift
import RxCocoa

extension Reactive where Base: AnimationView {
    
    public var isOn: Binder<Bool> {
        return Binder(self.base) { view, isOn in
            view.isHidden = !isOn
            isOn ? view.play() : view.stop()
        }
    }
    
}
