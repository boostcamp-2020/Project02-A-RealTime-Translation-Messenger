//
//  Navigator.swift
//  Pupago
//
//  Created by 김근수 on 2020/11/23.
//

import UIKit

protocol Navigatable {
    var navigator: Navigator! { get set }
}

class Navigator {
    
    static let `default` = Navigator()
    
    enum Scene {
        case language(viewModel: LanguageViewModel)
        case nickname(viewModel: NicknameViewModel)
        case chatlist(viewModel: ChattingListViewModel)
    }
    
    enum Transition {
        case root(in: UIWindow)
        case rootWithNavigation(in: UIWindow)
        case navigation
    }
    
    lazy var transition: CATransition = {
        var transition = CATransition()
        transition.duration = 5.0
        transition.type = CATransitionType.push
        transition.subtype = CATransitionSubtype.fromRight
        return transition
    }()
    
    func get(segue: Scene) -> UIViewController? {
        
        switch segue {
        case .language(let viewModel):
            return instantiateFromStoryBoard(type: LanguageViewController.self, viewModel: viewModel)
        case .nickname(let viewModel):
            return instantiateFromStoryBoard(type: NicknameViewController.self, viewModel: viewModel)
        case .chatlist(let viewModel):
            return instantiateFromStoryBoard(type: ChattingListViewController.self, viewModel: viewModel)
        }
    }
    
    func show(segue: Scene, sender: UIViewController?, transition: Transition) {
        guard let target = get(segue: segue) else { return }
        show(target: target, sender: sender, transition: transition)
    }
    
    private func show(target: UIViewController, sender: UIViewController?, transition: Transition) {
        switch transition {
        case .root(in: let window):
            window.rootViewController = target
            UIView.transition(with: window,
                              duration: 0.5,
                              options: .transitionCrossDissolve,
                              animations: nil,
                              completion: nil)
            return
        case .rootWithNavigation(in: let window):
            let navigationController = NavigationController(rootViewController: target)
            window.rootViewController = navigationController
            UIView.transition(with: window,
                              duration: 0.5,
                              options: .transitionCrossDissolve,
                              animations: nil,
                              completion: nil)
        default: break
        }
        
        guard let sender = sender else { return }
        
        switch transition {
        case .navigation:
            guard let navigationController = sender.navigationController else { return }
            navigationController.pushViewController(target, animated: true)
        default: break
        }
    }
    
    private func instantiateFromStoryBoard<T>(type: T.Type, viewModel: ViewModel) -> UIViewController? {
        let storyboard = UIStoryboard(name: "Main", bundle: nil)
        let identifier = String(describing: T.self)
        
        guard let targetViewController = storyboard.instantiateViewController(identifier: identifier) as? ViewController else { return nil }
        targetViewController.viewModel = viewModel
        targetViewController.navigator = self
        
        return targetViewController
    }
    
}
