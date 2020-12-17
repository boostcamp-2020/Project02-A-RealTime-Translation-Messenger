//
//  MockEndpoint.swift
//  Pupago
//
//  Created by 김근수 on 2020/11/30.
//

import Alamofire

enum MockEndpoint {
    case get
}

extension MockEndpoint: EndpointType {
    
    var path: String {
        switch self {
        case .get:
            return "room"
        }
    }
    
    var header: HTTPHeaders? {
        return nil
    }
    
    var method: HTTPMethod {
        return .get
    }
    
    var parameter: [String: Any]? {
        return nil
    }
}
