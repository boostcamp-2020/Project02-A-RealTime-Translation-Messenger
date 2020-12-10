//
//  PupagoAPI.swift
//  Pupago
//
//  Created by 김근수 on 2020/11/30.
//

import Foundation
import RxSwift

class PupagoAPI: NetworkProviding {
    
    func rooms() -> Observable<RoomList> {
        return request(endpoint: RoomEndpoint.get)
    }
    
    func createRoom(title: String, isPrivate: Bool) -> Observable<Room> {
        return request(endpoint: RoomEndpoint.create(title: title, isPrivate: isPrivate))
    }
    
    func join(code: String, isPrivate: Bool) -> Observable<Room> {
        return request(endpoint: RoomEndpoint.join(code: code, isPrivate: isPrivate))
    }
    
    func participantList(roomCode: String) -> Observable<Participants> {
        return request(endpoint: RoomEndpoint.getParticipant(roomCode: roomCode))
    }
    
    func langDetect(_ str: String) -> Observable<Language> {
        return request(endpoint: PapagoEndpoint.detect(text: str))
    }
    
    func translate(source: String, target: String, text: String) -> Observable<TranslationData> {
        return request(endpoint: PapagoEndpoint.translate(source: source, target: target, text: text))
    }
    
    func profile() -> Observable<Profile> {
        return request(endpoint: RoomEndpoint.profile)
    }
}
