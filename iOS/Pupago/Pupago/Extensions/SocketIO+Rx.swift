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
    
    func event(_ endpoint: SocketEndpoint) -> Observable<SocketAnyEvent> {
        return Observable.create { observer in
            self.base.onAny { event in
                if event.event == endpoint.eventName {
                    observer.onNext(event)
                }
            }
            return Disposables.create()
        }
    }
    
}
