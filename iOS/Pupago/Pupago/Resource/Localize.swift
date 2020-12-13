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
        var blanking: String
    }
    
    struct CreateRoomViewText {
        var title: String
        var description: String
        var publicRoom: String
        var privateRoom: String
        var createButton: String
    }
    
    struct JoinRoomViewText {
        var title: String
        var joinButton: String
    }
    
    struct ChatroomViewText {
        var language: String
        var enter: String
        var leave: String
        var copy: String
    }
    
    struct ParticipantViewText {
        var title: String
    }
    
    struct SpeechViewText {
        var assist: String
    }
    
    struct ScanningViewText {
        var title: String
        var description: String
        var originText: String
        var translationText: String
    }
}

extension Localize {
    
    var toString: String {
        switch self {
        case .korean:
            return "Korean"
        case .english:
            return "English"
        }
    }
    
    var toLocale: Locale {
        switch self {
        case .korean:
            return Locale(identifier: "ko-KR")
        case .english:
            return Locale(identifier: "en-US")
        }
    }
    
    var translating: String {
        switch self {
        case .korean:
            return "번역중..."
        case .english:
            return "translating..."
        }
    }
    
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
                         inputConstraint: "닉네임은 2-12자여야 하며, 공백이 없어야 합니다.",
                         nextButton: "시작하기")
        case .english:
            return .init(intro: "Next,\nEnter your nickname.",
                         inputPlaceholder: "Enter your nickname",
                         inputConstraint: "2-12 characters with No white spaces.",
                         nextButton: "Start")
        }
    }
    
    var chattingListViewText: ChatListViewText {
        switch self {
        case .korean:
            return .init(title: "푸파고",
                         language: "한국어",
                         chatroom: "채팅방",
                         blanking: "채팅방이 존재하지 않습니다.")
        case .english:
            return .init(title: "Pupago",
                         language: "English",
                         chatroom: "Chats",
                         blanking: "Chatroom does not exist")
        }
    }
    
    var createRoomViewText: CreateRoomViewText {
        switch self {
        case .korean:
            return .init(title: "방 생성하기",
                         description: "방 이름은 2-30자여야 합니다.",
                         publicRoom: "공개 채팅방",
                         privateRoom: "비공개 채팅방",
                         createButton: "생성하기")
        case .english:

            return .init(title: "Create Room",
                         description: "Room must be 2-30 characters.",
                         publicRoom: "Public Chat",
                         privateRoom: "Private Chat",
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
    
    var chatroomViewText: ChatroomViewText {
        switch self {
        case .korean:
            return .init(language: "한국어",
                         enter: "님이 들어왔습니다.",
                         leave: "님이 나갔습니다.",
                         copy: "가 복사되었습니다.")
        case .english:
            return .init(language: "English",
                         enter: " Came In",
                         leave: " Went Out",
                         copy: " has been copied.")
        }
    }
    
    var participantViewText: ParticipantViewText {
        switch self {
        case .korean:
            return .init(title: "대화 상대")
        case .english:
            return .init(title: "Contact")
        }
    }
    
    var speechViewText: SpeechViewText {
        switch self {
        case .korean:
            return .init(assist: "버튼을 눌러\n음성인식을 시작하세요.")
        case .english:
            return .init(assist: "Press the button\nto start voice recognition.")
        }
    }
    
    var scanningViewText: ScanningViewText {
        switch self {
        case .korean:
            return .init(title: "이미지 인식",
                         description: "이미지 인식을 시작하세요.",
                         originText: "원본 메시지",
                         translationText: "번역 메시지")
        case .english:
            return .init(title: "Image OCR",
                         description: "Start image recognition.",
                         originText: "Origin Message",
                         translationText: "Translation Message")
        }
    }
}
