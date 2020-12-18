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
    enum State {
        case enter
        case leave
        
        init?(_ value: String) {
            switch value {
            case "enter":
                self = .enter
            case "leave":
                self = .leave
            default:
                return nil
            }
        }
    }
    
    let participants: [Participant]
    let type: String?
    let diffNickname: String?
    
    var stateMessage: String {
        guard let name = diffNickname,
              let type = type,
              let state = State(type)
        else { return "" }
        
        let msg = Application.shared.localize.userMessage
        
        switch state {
        case .enter:
            return "\(name)\(msg.enter)"
        case .leave:
            return "\(name)\(msg.leave)"
        }
    }
}
