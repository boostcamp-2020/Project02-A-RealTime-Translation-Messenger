//
//  SelectableButton.swift
//  Pupago
//
//  Created by 김근수 on 2020/11/23.
//

import UIKit

class SelectableButton: Button {

    override open var isSelected: Bool {
        didSet {
            backgroundColor = isSelected ? .white : .clear
            setTitleColor(isSelected ? .systemGray : .white, for: isSelected ? .selected : .normal)
        }
    }

}
