//
//  GradientView.swift
//  Pupago
//
//  Created by 김근수 on 2020/11/23.
//

import UIKit

@IBDesignable
final class GradientView: UIView {
    
    @IBInspectable var firstColor: UIColor = UIColor.clear
    @IBInspectable var secondColor: UIColor = UIColor.clear
    
    override class var layerClass: AnyClass {
        return CAGradientLayer.self
    }
    
    override func layoutSubviews() {
        let layer = self.layer as? CAGradientLayer
        layer?.colors = [firstColor, secondColor].map { $0.cgColor }
        layer?.startPoint = CGPoint(x: 0.5, y: 0)
        layer?.endPoint = CGPoint(x: 0.5, y: 1)
    }
    
}
