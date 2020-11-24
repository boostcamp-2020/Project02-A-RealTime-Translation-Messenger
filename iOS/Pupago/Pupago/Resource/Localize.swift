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
}
