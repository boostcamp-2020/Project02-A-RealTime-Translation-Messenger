//
//  ChattingListCell.swift
//  Pupago
//
//  Created by 김근수 on 2020/11/25.
//

import UIKit

final class ChattingListCell: CollectionViewBaseCell {
    
    static let identifier = "ChattingListCell"
    
    @IBOutlet weak var createAtLabel: UILabel!
    @IBOutlet weak var numberOfPeopleLabel: UILabel!
    @IBOutlet weak var roomNameLabel: UILabel!
    
    override func makeUI() {
        super.makeUI()
        configureShadow()
    }
    
    func confiture(with room: Room) {
        roomNameLabel.text = room.title
        numberOfPeopleLabel.text = "\(room.participantCount ?? 0)/8"
        createAtLabel.text = room.createdAt
    }
    
    private func configureShadow() {
        self.layer.cornerRadius = 10
        self.layer.masksToBounds = false
        self.layer.shadowColor = UIColor.black.cgColor
        self.layer.shadowOffset = CGSize(width: 0, height: 1)
        self.layer.shadowOpacity = 0.5
        self.layer.shadowRadius = 3
    }
    
}
