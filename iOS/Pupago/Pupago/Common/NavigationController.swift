//
//  NavigationViewController.swift
//  Pupago
//
//  Created by kimn on 2020/11/24.
//

import UIKit

class NavigationController: UINavigationController {
    
    override init(rootViewController: UIViewController) {
        super.init(rootViewController: rootViewController)
        setup()
    }
    
    override init(nibName nibNameOrNil: String?, bundle nibBundleOrNil: Bundle?) {
        super.init(nibName: nibNameOrNil, bundle: nibBundleOrNil)
    }
        
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        setup()
    }

    private func setup() {
        navigationBar.setBackgroundImage(UIImage(), for: .default)
        navigationBar.clipsToBounds = true
        navigationBar.titleTextAttributes = [.foregroundColor: UIColor.white]
    }
}
