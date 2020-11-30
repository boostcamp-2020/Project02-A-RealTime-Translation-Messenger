//
//  PupagoAPI.swift
//  Pupago
//
//  Created by 김근수 on 2020/11/30.
//

import Foundation
import RxSwift

class PupagoAPI: NetworkProviding {
    
    func rooms() -> Observable<Room> {
        return request(endpoint: RoomEndpoint.get)
    }
    
    func createRoom(title: String, isPrivate: Bool) -> Observable<Room> {
        return request(endpoint: RoomEndpoint.create(title: title, isPrivate: isPrivate))
    }
    
    func join(code: String, isPrivate: Bool) -> Observable<Room> {
        return isPrivate ? request(endpoint: RoomEndpoint.joinPrivate(code: code)) :
            request(endpoint: RoomEndpoint.joinPublic(code: code))
    }
    
}
