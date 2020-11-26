//
//  String+Regex.swift
//  Pupago
//
//  Created by kimn on 2020/11/24.
//

import Foundation

func getSyntaxAfterRegex(newText: String, filter: String = "[a-zA-Z가-힣]") -> Bool {
    let regex = try! NSRegularExpression(pattern: filter, options: [])
    let list = regex.matches(in: newText, options: [], range: NSRange.init(location: 0, length: newText.count))
    if list.count != newText.count {
        return false
    }
    return true
}
