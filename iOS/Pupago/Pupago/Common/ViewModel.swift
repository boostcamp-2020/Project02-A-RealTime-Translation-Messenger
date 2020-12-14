//
//  ViewModelType.swift
//  Pupago
//
//  Created by 김근수 on 2020/11/23.
//

import RxSwift
import RxCocoa

protocol ViewModelType {
    associatedtype Input
    associatedtype Output
    
    func transform(_ input: Input) -> Output
}

class ViewModel: NSObject {
    
    let provider: NetworkProviding
    let localize: BehaviorRelay<Localize>
    let socketManager: SocketIOManager
    
    init(provider: NetworkProviding) {
        self.provider = provider
        localize = BehaviorRelay<Localize>(value: .korean)
        socketManager = SocketIOManager.shared
        
        super.init()
    }
}
