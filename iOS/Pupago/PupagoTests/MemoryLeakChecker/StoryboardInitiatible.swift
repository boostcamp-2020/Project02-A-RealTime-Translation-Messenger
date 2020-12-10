//
//  StoryboardInitiatible.swift
//
//
//  Created by 김종원 on 2020/11/26.
//

import UIKit

protocol StoryboardInstantiatible: NSObjectProtocol {
    static var storyboard: UIStoryboard { get }
    static var storyboardId: String { get }
}

extension StoryboardInstantiatible where Self: UIViewController {
    static var storyboard: UIStoryboard {
        UIStoryboard(name: "Main", bundle: nil)
    }
    
    static var storyboardId: String {
        String(describing: self)
    }

    static func instantiate() -> Self {
        guard let viewController = storyboard.instantiateViewController(withIdentifier: storyboardId) as? Self else {
            assertionFailure()
            return Self()
        }
        return viewController
    }
}

//extension MemoryLeakCheckable where Self: StoryboardInstantiatible & UIViewController {
//    static func instantiateForLeakChecking() -> Self {
//        Self.instantiate()
//    }
//}

