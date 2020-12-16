//
//  Language.swift
//  Pupago
//
//  Created by 김근수 on 2020/12/03.
//

import Foundation

struct Language: Codable {
    let langCode: String
}

extension Language {
    
    var code: String {
        return langCode != "ko" ? "en" : "ko"
    }
    
    var opposite: String {
        return langCode == "ko" ? "en" : "ko"
    }
    
}
