//
//  RoomEndpoint.swift
//  Pupago
//
//  Created by 김근수 on 2020/11/30.
//

import Alamofire

enum RoomEndpoint {
    case create(title: String, isPrivate: Bool)
    case get
    case join(code: String, isPrivate: Bool)
    case getParticipant(roomCode: String)
    case thumbnail
}

extension RoomEndpoint: EndpointType {

    var path: String {
        switch self {
        case .create, .get:
            return "room"
        case .join:
            return "join"
        case .getParticipant(let roomCode):
            return "room/participantsList/\(roomCode)"
        case .thumbnail:
            return "profileImage"
        }
    }
    
    var header: HTTPHeaders? {
        return nil
    }
    
    var method: HTTPMethod {
        switch self {
        case .create, .join:
            return .post
        case .get, .getParticipant, .thumbnail:
            return .get
        }
    }
    
    var parameter: [String: Any]? {
        switch self {
        case .get, .getParticipant, .thumbnail:
            return nil
        case .join(let code, let isPrivate):
            let isPrivate = isPrivate ? "true" : "false"
            return ["roomCode": code, "isPrivate": isPrivate]
        case .create(let title, let isPrivate):
            let isPrivate = isPrivate ? "true" : "false"
            return ["title": title, "isPrivate": isPrivate]
        }
    }
    
}
