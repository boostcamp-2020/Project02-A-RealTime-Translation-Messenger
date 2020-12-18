//
//  ParticipantCell.swift
//  Pupago
//
//  Created by 김근수 on 2020/12/05.
//

import UIKit
import Kingfisher

final class ParticipantCell: CollectionViewBaseCell {
    
    static let identifier = "ParticipantCell"
    
    @IBOutlet private weak var nameLabel: UILabel!
    @IBOutlet private weak var langLabel: UILabel!
    @IBOutlet private weak var thumbnailImageView: UIImageView!
    
    override func makeUI() {
        super.makeUI()
        confitureShadow()
    }
    
    func configure(with item: Participant) {
        let url = URL(string: item.imageLink ?? "")
        
        thumbnailImageView.kf.setImage(with: url)
        nameLabel.text = item.nickname
        langLabel.text = item.language
    }
    
    private func confitureShadow() {
        self.layer.cornerRadius = 10
        self.layer.masksToBounds = false
        self.layer.shadowColor = UIColor.black.cgColor
        self.layer.shadowOffset = CGSize(width: 0, height: 0.5)
        self.layer.shadowOpacity = 0.2
        self.layer.shadowRadius = 12
    }
    
}
