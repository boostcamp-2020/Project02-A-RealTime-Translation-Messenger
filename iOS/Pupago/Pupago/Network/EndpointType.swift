//
//  EndpointType.swift
//  Pupago
//
//  Created by 김근수 on 2020/11/30.
//

import RxSwift
import Alamofire

protocol EndpointType {
    var baseUrl: String { get }
    var header: HTTPHeaders? { get }
    var path: String { get }
    var method: HTTPMethod { get }
    var parameter: [String: Any]? { get }
}

extension EndpointType {
    var baseUrl: String {
        return "https://pupago-server.kro.kr/api/"
    }
}
