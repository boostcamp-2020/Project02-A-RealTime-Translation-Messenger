//
//  Room.swift
//  Pupago
//
//  Created by 김근수 on 2020/11/30.
//

import Foundation

struct Room: Codable {
    let roomCode: String?
    let title: String?
    let createdAt: String?
    let participantCount: Int?
    let isPrivate: String?
}

struct RoomList: Codable {
    let rooms: [Room]
}
