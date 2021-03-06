//
//  PupagoAPI.swift
//  Pupago
//
//  Created by 김근수 on 2020/11/30.
//

import RxSwift

final class PupagoAPI: NetworkProviding {
    
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
    
    func thumbnail() -> Observable<Thumbnail> {
        return request(endpoint: RoomEndpoint.thumbnail)
    }
    
    func ocr(data: String, timestamp: Int, requestId: String) -> Observable<OCRResponse> {
        return request(endpoint: ClovaEndpoint.detect(data: data, timestamp: timestamp, requestId: requestId))
    }
    
}
