//
//  NetworkProviding.swift
//  Pupago
//
//  Created by 김근수 on 2020/11/30.
//

import Foundation
import RxSwift
import Alamofire

enum APIError: Error {
    case invalidResponse
    case roomNotExist
    case decodeFailed
}

protocol NetworkProviding {
    func request<ResultType: Decodable>(endpoint: EndpointType) -> Observable<ResultType>
}

extension NetworkProviding {
    
    func request<ResultType: Decodable>(endpoint: EndpointType) -> Observable<ResultType> {
        return Observable.create { observer in
            AF.request(endpoint.baseUrl + endpoint.path,
                       method: endpoint.method,
                       parameters: endpoint.parameter,
                       encoding: JSONEncoding.default)
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
                            observer.onError(APIError.invalidResponse)
                    }
                       }
            return Disposables.create()
        }
    }
    
}
