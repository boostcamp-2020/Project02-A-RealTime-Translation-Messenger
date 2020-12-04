//
//  MyChattingCell.swift
//  Pupago
//
//  Created by kimn on 2020/11/27.
//

import UIKit

final class MyChattingCell: CollectionViewBaseCell {
    
    static let identifier = "MyChattingCell"
    
    @IBOutlet weak var chatTextField: UITextView!
    @IBOutlet weak var createAtLabel: UILabel!
    
    func configure(with item: Message) {
        let myLang = Application.shared.localize
        chatTextField.text = myLang == .korean ? item.korean : item.english
        createAtLabel.text = DateManager.stringFormat(of: item.createdAt)
    }
}
