//
//  MockAPI.swift
//  Pupago
//
//  Created by 김근수 on 2020/11/30.
//

import Foundation
import RxSwift

class MockAPI: NetworkProviding {
    func rooms() -> Observable<RoomList> {
        return request(endpoint: MockEndpoint.get)
    }
    
    func createRoom(title: String, isPrivate: Bool) -> Observable<Room> {
        let room = Room(roomCode: nil, title: title, createdAt: nil, participantCount: nil, isPrivate: nil)
        return Observable<Room>.of(room)
    }
    
    func join(code: String, isPrivate: Bool) -> Observable<Room> {
        let room = Room(roomCode: code, title: nil, createdAt: nil, participantCount: nil, isPrivate: nil)
        return Observable.of(room)
    }
    
    func participantList(roomCode: String) -> Observable<Participants> {
        return Observable.empty()
    }
    
    func langDetect(_ str: String) -> Observable<Language> {
        return Observable.empty()
    }
    
    func translate(source: String, target: String, text: String) -> Observable<TranslationData> {
        return Observable.empty()
    }
    
    func profile() -> Observable<Profile> {
        return Observable.empty()
    }
    
    func ocr(data: String, timestamp: Int, requestId: String) -> Observable<OCRResponse> {
        return Observable.empty()
    }
    
}

extension MockAPI {
    
    func request<ResultType: Decodable>(endpoint: EndpointType) -> Observable<ResultType> {
        guard
            let filePath = Bundle.main.path(forResource: endpoint.path, ofType: "json"),
            let data = try? String(contentsOfFile: filePath).data(using: .utf8)
        else { return Observable<ResultType>.empty() }
        
        return Observable<ResultType>.create { observer in
            do {
                let target = try JSONDecoder().decode(ResultType.self, from: data)
                observer.onNext(target)
            } catch {
                observer.onError(error)
            }
            return Disposables.create()
        }.share()
    }
    
}
