//
//  SegementedControl.swift
//  Pupago
//
//  Created by 김영렬 on 2020/12/01.
//

import UIKit

@IBDesignable
class SegmentControl: UISegmentedControl {
    
    @IBInspectable var textColor: UIColor {
        get { .black }
        set {
            let unselectedAttributes = [NSAttributedString.Key.foregroundColor: newValue]
            let selectedAttributes = [NSAttributedString.Key.foregroundColor: UIColor.black]
            
            self.setTitleTextAttributes(unselectedAttributes, for: .normal)
            self.setTitleTextAttributes(selectedAttributes, for: .selected)
        }
    }
    
}
