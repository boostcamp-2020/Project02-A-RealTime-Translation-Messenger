//
//  RegexManager.swift
//  Pupago
//
//  Created by 김근수 on 2020/11/26.
//

import Foundation

final class RegexManager {
    
    enum Pattern: String {
        case nickname = "[A-Za-z가-힣]"
        case roomName = "[a-zA-Z가-힣]"
        case roomCode = "[A-Z0-9]"
    }
    
    public static func validate(of target: String, for pattern: Pattern) -> Bool {
        guard let regex = try? NSRegularExpression(pattern: pattern.rawValue, options: []) else { return false }
        
        let list = regex.matches(in: target, options: [], range: NSRange.init(location: 0, length: target.count))
        if list.count != target.count {
            return false
        }
        
        return true
    }
    
}
