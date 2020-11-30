//
//  File.swift
//  Pupago
//
//  Created by kimn on 2020/11/28.
//

import Foundation
import RxSwift
import RxDataSources

struct MessageSection {
    var header: String
    var items: [Item]
}

struct Message {
    var user: User
    var messageItems: MessageItem
}

struct MessageItem {
    var text: String
    var chattingAt: String
}

enum User: String {
    case others = "OthersChattingCell"
    case mine = "MyChattingCell"
}

extension MessageSection: SectionModelType {
    typealias Item = Message
    
    init(original: MessageSection, items: [Item]) {
        self = original
        self.items = items
    }
}
