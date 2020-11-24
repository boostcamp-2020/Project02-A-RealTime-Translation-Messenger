//
//  ViewModelType.swift
//  Pupago
//
//  Created by 김근수 on 2020/11/23.
//

import Foundation
import RxSwift
import RxCocoa

protocol ViewModelType {
    associatedtype Input
    associatedtype Output
    
    func transform(_ input: Input) -> Output
}

class ViewModel: NSObject {
    let localize = BehaviorRelay<Localize>(value: Application.shared.localize)
}
