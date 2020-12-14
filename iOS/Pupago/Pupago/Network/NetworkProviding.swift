//
//  NetworkProviding.swift
//  Pupago
//
//  Created by 김근수 on 2020/11/30.
//

import RxSwift
import Alamofire

enum APIError: Error {
    case invalidResponse
    case roomNotExist
    case decodeFailed
}

protocol NetworkProviding {
    func request<ResultType: Decodable>(endpoint: EndpointType) -> Observable<ResultType>
    func rooms() -> Observable<RoomList>
    func createRoom(title: String, isPrivate: Bool) -> Observable<Room>
    func join(code: String, isPrivate: Bool) -> Observable<Room>
    func participantList(roomCode: String) -> Observable<Participants>
    func langDetect(_ str: String) -> Observable<Language>
    func translate(source: String, target: String, text: String) -> Observable<TranslationData>
    func profile() -> Observable<Profile>
    func ocr(data: String, timestamp: Int, requestId: String) -> Observable<OCRResponse>
}

extension NetworkProviding {
    
    func request<ResultType: Decodable>(endpoint: EndpointType) -> Observable<ResultType> {
        return Observable.create { observer in
            AF.request(endpoint.baseUrl + endpoint.path,
                       method: endpoint.method,
                       parameters: endpoint.parameter,
                       encoding: JSONEncoding.default,
                       headers: endpoint.header)
                .validate()
                .responseData { response in
                    switch response.result {
                    case .success(let data):
                        let decoder = JSONDecoder()
                        do {
                            let decoded = try decoder.decode(ResultType.self, from: data)
                            observer.onNext(decoded)
                        } catch {
                            observer.onError(APIError.decodeFailed)
                        }
                    case .failure(let error):
                        error.responseCode == 406 ? observer.onError(APIError.roomNotExist) :
                            observer.onError(error)
                    }
                }
            return Disposables.create()
        }
    }
    
}
