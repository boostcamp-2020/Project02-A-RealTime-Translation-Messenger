//
//  OthersChattingCell.swift
//  Pupago
//
//  Created by kimn on 2020/11/27.
//

import UIKit

class OthersChattingCell: CollectionViewBaseCell {
    
    static let identifier = "OthersChattingCell"
    
    @IBOutlet weak var profileImage: UIImageView!
    @IBOutlet weak var userNameLabel: UILabel!
    @IBOutlet weak var originChatTextView: UITextView!
    @IBOutlet weak var translationChatTextView: UITextView!
    @IBOutlet weak var createAtLabel: UILabel!
    
    func configure(with item: Message) {
        let myLang = Application.shared.localize
        userNameLabel.text = item.nickname
        originChatTextView.text = myLang == .korean ? item.korean : item.english
        translationChatTextView.text = myLang == .korean ? item.english : item.korean
        createAtLabel.text = DateManager.stringFormat(of: item.createdAt)
    }
}
