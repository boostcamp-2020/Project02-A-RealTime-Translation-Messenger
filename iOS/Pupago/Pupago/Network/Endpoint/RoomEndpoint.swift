//
//  RoomEndpoint.swift
//  Pupago
//
//  Created by 김근수 on 2020/11/30.
//

import Foundation
import Alamofire

enum RoomEndpoint {
    case create(title: String, isPrivate: Bool)
    case get
    case joinPrivate(code: String)
    case joinPublic(code: String)
}

extension RoomEndpoint: EndpointType {

    var path: String {
        switch self {
        case .create, .get:
            return "room"
        case .joinPublic:
            return "join/public"
        case .joinPrivate:
            return "join/private"
        }
    }
    
    var method: HTTPMethod {
        switch self {
        case .create, .joinPrivate, .joinPublic:
            return .post
        case .get:
            return .get
        }
    }
    
    var parameter: [String: Any] {
        switch self {
        case .get:
            return [String: Any]()
        case .joinPublic(let code), .joinPrivate(let code):
            return ["roomCode": code]
        case .create(let title, let isPrivate):
            let isPrivate = isPrivate ? "true" : "false"
            return ["title": title, "isPrivate": isPrivate]
        }
    }
    
}
