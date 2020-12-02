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
    let manager = SocketManager(socketURL: URL(string: "ws://118.67.134.11:3000")!, config: [.log(false), .forceWebsockets(true), .compress])
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
