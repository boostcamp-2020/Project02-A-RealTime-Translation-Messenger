//
//  ParticipantCell.swift
//  Pupago
//
//  Created by 김근수 on 2020/12/05.
//

import UIKit

class ParticipantCell: CollectionViewBaseCell {
    
    static let identifier = "ParticipantCell"
    
    @IBOutlet weak var nameLabel: UILabel!
    @IBOutlet weak var langLabel: UILabel!
    @IBOutlet weak var thumbnailImageView: UIImageView!
    
    override func makeUI() {
        super.makeUI()
        confitureShadow()
    }
    
    func configure(with item: Participant) {
        nameLabel.text = item.nickname
        langLabel.text = item.language
    }
    
    private func confitureShadow() {
        self.layer.cornerRadius = 10
        self.layer.masksToBounds = false
        self.layer.shadowColor = UIColor.black.cgColor
        self.layer.shadowOffset = CGSize(width: 0, height: 1)
        self.layer.shadowOpacity = 0.5
        self.layer.shadowRadius = 3
    }
    
}
