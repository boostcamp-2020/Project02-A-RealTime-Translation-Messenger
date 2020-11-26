//
//  Application.swift
//  Pupago
//
//  Created by 김근수 on 2020/11/24.
//

import UIKit

class Application: NSObject {
    
    static let shared = Application()
    
    var window: UIWindow?
    
    let navigator: Navigator
    var userName: String
    var localize: Localize
    
    private override init() {
        navigator = Navigator.default
        userName = ""
        localize = .korean
    }
    
    func presentInitialScreen(in window: UIWindow?) {
        guard let window = window else { return }
        self.window = window
        
        let viewModel = LanguageViewModel()
        navigator.show(segue: .language(viewModel: viewModel),
                       sender: nil,
                       transition: .root(in: window))
        
    }
}
