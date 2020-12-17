//
//  Image.swift
//  Pupago
//
//  Created by 김근수 on 2020/12/17.
//

import UIKit

enum Image {
    case micing
    case miced
    case arrow
    case arrowed
}

extension Image {
    
    var value: UIImage? {
        switch self {
        case .miced:
            return UIImage(named: "miced")
        case .micing:
            return UIImage(named: "micing")
        case .arrow:
            return UIImage(named: "arrow")
        case .arrowed:
            return UIImage(named: "arrowed")
        }
    }
    
}
