//
//  ChattingListBaseCell.swift
//  Pupago
//
//  Created by 김근수 on 2020/11/25.
//

import UIKit

class CollectionViewBaseCell: UICollectionViewCell {
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        makeUI()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        makeUI()
    }
    
    func makeUI() {
        setNeedsDisplay()
    }
    
}
