//
//  Localize.swift
//  Pupago
//
//  Created by 김근수 on 2020/11/23.
//

import Foundation

enum Localize {
    case korean
    case english
    
    struct SettingLanguageViewText {
        let intro: String
        let description: String
        let nextButton: String
    }
    
    struct SettingNicknameViewText {
        var intro: String
        var inputPlaceholder: String
        var inputConstraint: String
        var nextButton: String
    }
    
    struct ChatListViewText {
        var title: String
        var language: String
        var chatroom: String
    }
    
    struct CreateRoomViewText {
        var title: String
        var description: String
        var createButton: String
    }
    
    struct JoinRoomViewText {
        var title: String
        var joinButton: String
    }
}

extension Localize {
    
    var languageViewText: SettingLanguageViewText {
        switch self {
        case .korean:
            return .init(intro: "안녕하세요!\n실시간 번역 채팅 서비스입니다\n글로벌 채팅을 즐겨보세요!",
                            description: "언어를 선택해주세요",
                            nextButton: "다음")
        case .english:
            return .init(intro: "Hello!\nWelcome to Realtime Chat\nEnjoy Global Chatting!",
                            description: "Select your Language",
                            nextButton: "Next")
        }
    }
    
    var nicknameViewText: SettingNicknameViewText {
        switch self {
        case .korean:
            return .init(intro: "다음으로\n닉네임을 입력해주세요.",
                         inputPlaceholder: "닉네임을 입력해주세요.",
                         inputConstraint: "닉네임은 2-12자여야 합니다.",
                         nextButton: "시작하기")
        case .english:
            return .init(intro: "Next,\nEnter your nickname.",
                         inputPlaceholder: "Enter your nickname",
                         inputConstraint: "Nickname must be 2-12 characters.",
                         nextButton: "Start")
        }
    }
    
    var chattingListViewText: ChatListViewText {
        switch self {
        case .korean:
            return .init(title: "푸파고",
                         language: "한국어",
                         chatroom: "채팅방")
        case .english:
            return .init(title: "Pupago",
                         language: "English",
                         chatroom: "Chats")
        }
    }
    
    var createRoomViewText: CreateRoomViewText {
        switch self {
        case .korean:
            return .init(title: "방 생성하기",
                         description: "방 이름은 2-30자여야 합니다.",
                         createButton: "생성하기")
        case .english:
            return .init(title: "Room Create",
                         description: "Room must be 2-30 characters.",
                         createButton: "Create")
        }
    }
    
    var joinRoomViewText: JoinRoomViewText {
        switch self {
        case .korean:
            return .init(title: "방 참가하기",
                         joinButton: "참가하기")
        case .english:
            return .init(title: "Join Room",
                         joinButton: "Join")
        }
    }
}
