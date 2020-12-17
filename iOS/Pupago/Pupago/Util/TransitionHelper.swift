//
//  TransitionHelper.swift
//  Pupago
//
//  Created by 김근수 on 2020/12/05.
//

import UIKit

final class SlidInTransitionHelper: NSObject, UIViewControllerTransitioningDelegate {
    
    let transition = SlideInTransition()
    
    func animationController(forPresented presented: UIViewController, presenting: UIViewController, source: UIViewController) -> UIViewControllerAnimatedTransitioning? {
        transition.isPresenting = true
        return transition
    }

    func animationController(forDismissed dismissed: UIViewController) -> UIViewControllerAnimatedTransitioning? {
        transition.isPresenting = false
        return transition
    }
    
}
