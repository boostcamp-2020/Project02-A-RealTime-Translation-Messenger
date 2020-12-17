//
//  SocketManager.swift
//  Pupago
//
//  Created by 김근수 on 2020/12/01.
//

import SocketIO

class SocketIOManager {
    
    static let shared = SocketIOManager()
    let manager = SocketManager(socketURL: SocketEndpoint.baseUrl, config: [.log(false), .compress])
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
        let thumbnail = Application.shared.thumbnail
        let item = ["roomCode": roomCode, "nickname": nickname, "language": language, "imageLink": thumbnail]
        
        socket.emit(SocketEndpoint.enter.eventName, item)
    }
    
    func leavChatroom() {
        socket.emit(SocketEndpoint.leave.eventName)
    }
    
    func sendMessage(korean: String, english: String, origin: String) {
        let item = ["Korean": korean, "English": english, "origin": origin]
        
        socket.emit(SocketEndpoint.sendMessage.eventName, item)
    }
    
}
