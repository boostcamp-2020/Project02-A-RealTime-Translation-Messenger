//
//  SlideInTransition.swift
//  Pupago
//
//  Created by 김근수 on 2020/12/05.
//

import UIKit

class SlideInTransition: NSObject, UIViewControllerAnimatedTransitioning {

    var isPresenting = false
    let dimmingView = UIView()

    func transitionDuration(using transitionContext: UIViewControllerContextTransitioning?) -> TimeInterval {
        return 0.3
    }

    func animateTransition(using transitionContext: UIViewControllerContextTransitioning) {

        guard let toViewController = transitionContext.viewController(forKey: .to),
            let fromViewController = transitionContext.viewController(forKey: .from) else { return }

        let containerView = transitionContext.containerView

        let viewWidth = toViewController.view.bounds.width
        let finalWidth = viewWidth * 0.75
        let finalHeight = toViewController.view.bounds.height

        if isPresenting {
            dimmingView.backgroundColor = .black
            dimmingView.alpha = 0.0
            containerView.addSubview(dimmingView)
            dimmingView.frame = containerView.bounds
            containerView.addSubview(toViewController.view)

            toViewController.view.frame = CGRect(x: viewWidth, y: 0, width: finalWidth, height: finalHeight)
        }

        let transform = {
            self.dimmingView.alpha = 0.5
            toViewController.view.transform = CGAffineTransform(translationX: -finalWidth, y: 0)
        }

        let identity = {
            self.dimmingView.alpha = 0.0
            fromViewController.view.transform = .identity
        }

        let duration = transitionDuration(using: transitionContext)
        let isCancelled = transitionContext.transitionWasCancelled
        
        UIView.animate(withDuration: duration, animations: {
            self.isPresenting ? transform() : identity()
        }, completion: { _ in
            transitionContext.completeTransition(!isCancelled)
        })
    }

}
