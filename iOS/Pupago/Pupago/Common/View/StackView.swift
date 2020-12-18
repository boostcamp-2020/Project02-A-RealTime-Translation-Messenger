//
//  StackView.swift
//  Pupago
//
//  Created by kimn on 2020/11/27.
//

import UIKit

@IBDesignable
class StackView: UIStackView {

    @IBInspectable var cornerRadius: CGFloat {
        get { return layer.cornerRadius }
        set { layer.cornerRadius = newValue }
    }
    
    @IBInspectable var shadowRadius: CGFloat {
        get { return layer.shadowRadius }
        set { layer.shadowRadius = newValue }
    }
    
    @IBInspectable var shadowOpacity: Float {
        get { return layer.shadowOpacity }
        set { layer.shadowOpacity = newValue }
    }
    
    @IBInspectable var shadowColor: UIColor? {
        get { return UIColor(cgColor: layer.shadowColor ?? UIColor.clear.cgColor) }
        set { layer.shadowColor = newValue?.cgColor ?? UIColor.clear.cgColor }
    }
    
    @IBInspectable var shadowOffset: CGSize {
        get { return layer.shadowOffset }
        set { layer.shadowOffset = newValue }
    }

}
