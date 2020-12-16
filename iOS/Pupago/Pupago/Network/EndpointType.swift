//
//  EndpointType.swift
//  Pupago
//
//  Created by 김근수 on 2020/11/30.
//

import Foundation
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
        return "http://118.67.134.11:3000/api/"
    }
}
