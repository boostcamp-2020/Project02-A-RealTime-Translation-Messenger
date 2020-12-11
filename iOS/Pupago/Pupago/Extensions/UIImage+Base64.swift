//
//  UIImage+Base64.swift
//  Pupago
//
//  Created by 김근수 on 2020/12/11.
//

import UIKit

extension UIImage {
    
    var base64: String {
        let data = self.pngData()
        return data?.base64EncodedString() ?? ""
    }
    
}
