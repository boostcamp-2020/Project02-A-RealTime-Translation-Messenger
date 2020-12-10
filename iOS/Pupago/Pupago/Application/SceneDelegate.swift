//
//  SceneDelegate.swift
//  Pupago
//
//  Created by 김근수 on 2020/11/19.
//

import UIKit
import AVFoundation

class SceneDelegate: UIResponder, UIWindowSceneDelegate {
    
    var window: UIWindow?
    let application = Application.shared
    
    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
        application.setUpSocket()
        application.presentInitialScreen(in: window)
        
        var id: UInt32 = 0
        let fileUrl = NSURL(string: "/System/Library/Audio/UISounds/acknowledgment_received.caf")!
        AudioServicesCreateSystemSoundID(fileUrl, &id)
        print(id)
        guard let _ = (scene as? UIWindowScene) else { return }
    }
    
    func sceneWillEnterForeground(_ scene: UIScene) {
        SocketIOManager.shared.establishConnect()
    }
    
    func sceneDidEnterBackground(_ scene: UIScene) {
        application.isSocketValid.accept(false)
        SocketIOManager.shared.closeConnection()
    }
    
}

