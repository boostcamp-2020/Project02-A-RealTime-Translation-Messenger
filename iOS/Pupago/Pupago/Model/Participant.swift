//
//  Participant.swift
//  Pupago
//
//  Created by 김근수 on 2020/12/05.
//

import Foundation

struct Participant: Codable {
    let socketId: String
    let nickname: String
    let language: String
    let imageLink: String?
}

struct Participants: Codable {
    let participantsList: [Participant]
}
