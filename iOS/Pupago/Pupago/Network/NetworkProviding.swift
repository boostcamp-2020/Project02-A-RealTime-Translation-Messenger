//
//  NetworkProviding.swift
//  Pupago
//
//  Created by 김근수 on 2020/11/30.
//

import Foundation
import RxSwift
import Alamofire

protocol NetworkProviding {
    func request<ResultType: Decodable>(endpoint: EndpointType) -> Observable<ResultType>
}

extension NetworkProviding {
    
    func request<ResultType: Decodable>(endpoint: EndpointType) -> Observable<ResultType> {
        return Observable.create { observer in
            AF.request(endpoint.baseUrl + endpoint.path,
                       method: endpoint.method,
                       parameters: endpoint.parameter).responseData { response in
                        guard let data = response.value else { return }
                        let decoder = JSONDecoder()
                        do {
                            let decoded = try decoder.decode(ResultType.self, from: data)
                            observer.onNext(decoded)
                        } catch {
                            observer.onError(error)
                        }
                       }
            return Disposables.create()
        }.share()
    }
    
}
