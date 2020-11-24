//
//  SceneDelegate.swift
//  Pupago
//
//  Created by 김근수 on 2020/11/19.
//

import UIKit

class SceneDelegate: UIResponder, UIWindowSceneDelegate {

    var window: UIWindow?

    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
        Application.shared.presentInitialScreen(in: window)
        guard let _ = (scene as? UIWindowScene) else { return }
    }

}

