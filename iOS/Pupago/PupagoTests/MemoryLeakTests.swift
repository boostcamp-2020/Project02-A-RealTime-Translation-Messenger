//
//  MemoryLeakTests.swift
//  PupagoTests
//
//  Created by 김종원 on 2020/12/03.
//

import XCTest
@testable import Pupago

class MemoryLeakTests: XCTestCase {
    
    lazy var onceToken: NSObject = {
        Resolver.setupForMemoryLeakTest()
        return NSObject()
    }()
   
    override func setUpWithError() throws {
        _ = onceToken
    }
    
    func testLanguageViewControllerIsLeak() {
        XCTAssertLeak(viewController: LanguageViewController.self)
    }
    
    func testNicknameViewControllerIsLeak() {
        XCTAssertLeak(viewController: NicknameViewController.self)
    }
    
    func testChattingListViewControllerIsLeak() {
        XCTAssertLeak(viewController: ChattingListViewController.self)
    }
    
    func testCreateRoomViewControllerIsLeak() {
        XCTAssertLeak(viewController: CreateRoomViewController.self)
    }
    
    func testJoinRoomViewControllerIsLeak() {
        XCTAssertLeak(viewController: JoinRoomViewController.self)
    }
    
    func testChattingViewControllerIsLeak() {
        XCTAssertLeak(viewController: ChattingViewController.self)
    }
    
}

extension LanguageViewController: MemoryLeakCheckable, StoryboardInstantiatible, Resolvable {}
extension NicknameViewController: MemoryLeakCheckable, StoryboardInstantiatible, Resolvable {}
extension ChattingListViewController: MemoryLeakCheckable, StoryboardInstantiatible, Resolvable {}
extension CreateRoomViewController: MemoryLeakCheckable, StoryboardInstantiatible, Resolvable {}
extension JoinRoomViewController: MemoryLeakCheckable, StoryboardInstantiatible, Resolvable {}
extension ChattingViewController: MemoryLeakCheckable, StoryboardInstantiatible, Resolvable {}

extension Resolver {
    
    static func setupForMemoryLeakTest() {
        Resolver.shared
            .regist { _ in LanguageViewModel() }
            .regist { _ in NicknameViewModel() }
            .regist { _ in ChattingListViewModel() }
            .regist { _ in CreateRoomViewModel() }
            .regist { _ in JoinRoomViewModel() }
            .regist { _ in ChattingViewModel() }
            .regist { resolver in
                LanguageViewController.instantiate()
                    .setup { $0.viewModel = resolver.resolve(LanguageViewModel.self) }
            }
            .regist { resolver in
                NicknameViewController.instantiate()
                    .setup { $0.viewModel = resolver.resolve(NicknameViewModel.self) }
            }
            .regist { resolver in
                ChattingListViewController.instantiate()
                    .setup { $0.viewModel = resolver.resolve(ChattingListViewModel.self) }
            }
            .regist { resolver in
                CreateRoomViewController.instantiate()
                    .setup { $0.viewModel = resolver.resolve(CreateRoomViewModel.self) }
            }
            .regist { resolver in
                JoinRoomViewController.instantiate()
                    .setup { $0.viewModel = resolver.resolve(JoinRoomViewModel.self) }
            }
            .regist { resolver in
                ChattingViewController.instantiate()
                    .setup { $0.viewModel = resolver.resolve(ChattingViewModel.self) }
            }
    }
    
}
