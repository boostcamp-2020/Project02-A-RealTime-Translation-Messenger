//
//  Application.swift
//  Pupago
//
//  Created by 김근수 on 2020/11/24.
//

import UIKit
import RxCocoa

final class Application: NSObject {
    
    static let shared = Application()
    
    var window: UIWindow?
    
    let navigator: Navigator
    var userName: String
    var localize: Localize
    var profile: String
    var currentRoomCode = ""
    
    let isSocketValid = PublishRelay<Bool>()
    let socketManager = SocketIOManager.shared
    
    private override init() {
        navigator = Navigator.default
        userName = ""
        localize = .korean
        profile = ""
    }
    
    func setUpSocket() {
        socketManager.socket.rx.event(.connect)
            .subscribe(onNext: { [unowned self] _ in
                isSocketValid.accept(true)
            })
            .disposed(by: rx.disposeBag)
        
        isSocketValid
            .asObservable()
            .filter { $0 == true }
            .subscribe(onNext: { [unowned self] _ in
                !currentRoomCode.isEmpty ? socketManager.enterChatroom(roomCode: currentRoomCode) : nil
            })
            .disposed(by: rx.disposeBag)
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
