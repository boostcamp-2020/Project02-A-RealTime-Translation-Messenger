//
//  SocketManager.swift
//  Pupago
//
//  Created by 김근수 on 2020/12/01.
//

import Foundation
import SocketIO

class SocketIOManager {
    
    static let shared = SocketIOManager()
    let manager = SocketManager(socketURL: SocketEndpoint.baseUrl, config: [.log(true), .compress])
    var socket: SocketIOClient!
    
    private init() {
        socket = manager.defaultSocket
    }
    
    func establishConnect() {
        socket.connect()
    }
    
    func closeConnection() {
        socket.disconnect()
    }
    
    func enterChatroom(roomCode: String) {
        let nickname = Application.shared.userName
        let language = Application.shared.localize.toString
        let item = ["roomCode": roomCode, "nickname": nickname, "language": language]
        
        socket.emit(SocketEndpoint.enter.eventName, item)
    }
    
}
