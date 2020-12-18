//
//  OthersChattingCell.swift
//  Pupago
//
//  Created by kimn on 2020/11/27.
//

import UIKit
import Kingfisher

final class OthersChattingCell: CollectionViewBaseCell {
    
    static let identifier = "OthersChattingCell"
    
    @IBOutlet private weak var profileImage: UIImageView!
    @IBOutlet private weak var userNameLabel: UILabel!
    @IBOutlet private weak var originChatTextView: UITextView!
    @IBOutlet private weak var translationChatTextView: UITextView!
    @IBOutlet private weak var createAtLabel: UILabel!
    
    func configure(with item: Message) {
        let myLang = Application.shared.localize
        let url = URL(string: Application.shared.thumbnail)
        userNameLabel.text = item.nickname
        originChatTextView.text = myLang == .korean ? item.korean : item.english
        translationChatTextView.text = myLang == .korean ? item.english : item.korean
        createAtLabel.text = DateManager.stringFormat(of: item.createdAt)
        profileImage.kf.setImage(with: url)
    }
}
