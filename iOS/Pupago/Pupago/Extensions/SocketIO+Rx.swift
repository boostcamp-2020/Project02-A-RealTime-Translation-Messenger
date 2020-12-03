//
//  SocketIO+Rx.swift
//  Pupago
//
//  Created by 김근수 on 2020/12/01.
//

import Foundation

import RxSwift
import SocketIO

extension Reactive where Base: SocketIOClient {
    
    func event(_ endpoint: SocketEndpoint) -> Observable<[Any]> {
        return Observable.create { observer in
            self.base.on(endpoint.eventName) { data, _ in
                observer.onNext(data)
            }
            return Disposables.create()
        }
    }
    
}
