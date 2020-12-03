//
//  Translation.swift
//  Pupago
//
//  Created by 김근수 on 2020/12/03.
//

import Foundation

struct TranslationData: Codable {
    let message: Message
    
    struct Message: Codable {
        let result: Result
    }
    
    struct Result: Codable {
        let srcLangType: String
        let tarLangType: String
        let translatedText: String
    }
}
