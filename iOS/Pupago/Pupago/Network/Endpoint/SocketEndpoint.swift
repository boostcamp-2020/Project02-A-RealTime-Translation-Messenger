//
//  SocketEndpoint.swift
//  Pupago
//
//  Created by 김근수 on 2020/12/02.
//

import Foundation

protocol SocketEndpointType {
    var baseUrl: URL { get }
    var eventName: String { get }
}

enum SocketEndpoint {
    case connect
    case enter
    case leave
    case sendMessage
    case receiveMessage
    case list
    case error
}

extension SocketEndpoint: SocketEndpointType {
    var baseUrl: URL {
        let urlString = "192.0.0.1:3000"
        let url = URL(string: urlString) ?? URL(fileURLWithPath: "")
        return url
    }
    
    var eventName: String {
        switch self {
        case .connect:
            return "connect"
        case .enter:
            return "enter chatroom"
        case .leave:
            return "leave chatroom"
        case .sendMessage:
            return "send chat"
        case .receiveMessage:
            return "receive chat"
        case .list:
            return "receive participants list"
        case .error:
            return "socketError"
        }
    }
    
    
}
