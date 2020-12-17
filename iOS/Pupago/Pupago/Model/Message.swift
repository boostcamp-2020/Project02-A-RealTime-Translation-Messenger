//
//  File.swift
//  Pupago
//
//  Created by kimn on 2020/11/28.
//

import RxDataSources

struct MessageSection {
    var header: String
    var items: [Item]
}

struct Message: Decodable {
    let korean: String
    let english: String
    let senderId: String
    let nickname: String
    let imageLink: String?
    let createdAt: String
    
    enum CodingKeys: String, CodingKey {
        case korean = "Korean"
        case english = "English"
        case senderId = "senderId"
        case nickname = "nickname"
        case imageLink = "imageLink"
        case createdAt = "createdAt"
    }
}

extension MessageSection: SectionModelType {
    typealias Item = Message
    
    init(original: MessageSection, items: [Item]) {
        self = original
        self.items = items
    }
}
