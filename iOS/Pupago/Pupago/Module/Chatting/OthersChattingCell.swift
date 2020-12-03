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
    
    func bind() {
        
    }
}
