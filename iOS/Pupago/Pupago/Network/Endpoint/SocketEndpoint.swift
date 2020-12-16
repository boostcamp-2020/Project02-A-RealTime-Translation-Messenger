//
//  SocketEndpoint.swift
//  Pupago
//
//  Created by 김근수 on 2020/12/02.
//

import Foundation

protocol SocketEndpointType {
    var eventName: String { get }
}

enum SocketEndpoint {
    static let baseUrl = URL(string: "http://118.67.134.11:3000") ?? URL(fileURLWithPath: "")
    
    case connect
    case enter
    case leave
    case sendMessage
    case receiveMessage
    case list
    case error
}

extension SocketEndpoint: SocketEndpointType {
    
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
