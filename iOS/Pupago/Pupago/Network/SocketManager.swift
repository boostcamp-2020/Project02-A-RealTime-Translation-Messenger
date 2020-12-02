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
    
}
