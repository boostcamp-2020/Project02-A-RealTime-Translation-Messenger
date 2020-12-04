//
//  MockAPI.swift
//  Pupago
//
//  Created by 김근수 on 2020/11/30.
//

import Foundation
import RxSwift

class MockAPI: NetworkProviding {
    
    func rooms() -> Observable<[Room]> {
        return request(endpoint: MockEndpoint.get)
    }
    
    func createRoom(roomCode: String, isPrivate: Bool) -> Observable<Room> {
        let room = Room(roomCode: roomCode, title: nil, createdAt: nil, participantCount: nil, isPrivate: nil)
        return Observable<Room>.of(room)
    }
    
    func join(roomCode: String, isPrivate: Bool) -> Observable<Bool> {
        return Observable.of(true)
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
