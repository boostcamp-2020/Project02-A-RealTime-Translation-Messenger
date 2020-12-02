//
//  ChattingMainViewModel.swift
//  Pupago
//
//  Created by kimn on 2020/11/24.
//

import Foundation
import RxSwift
import RxCocoa
import SocketIO

final class ChattingListViewModel: ViewModel, ViewModelType {
    
    struct Input {
        let createTrigger: Observable<Void>
        let joinTrigger: Observable<Void>
        let selection: Observable<IndexPath>
    }
    
    struct Output {
        let viewTexts: Driver<(localizeTexts: Localize.ChatListViewText, nickname: String)>
        let item: Driver<[Room]>
        let created: Driver<CreateRoomViewModel>
        let joined: Driver<JoinRoomViewModel>
        let entered: Driver<ChattingViewModel>
    }
    
    let rooms = BehaviorRelay<[Room]>(value: [])
    let roomInfo = PublishRelay<(code: String, isPrivate: Bool)>()
    let apiJoinValid = PublishRelay<Bool>()
    
    func transform(_ input: Input) -> Output {
        
        let pupagoAPI = PupagoAPI()
        
        pupagoAPI.rooms().asObservable()
            .subscribe(onNext: { [unowned self] result in
                self.rooms.accept(result.roomList)
            }, onError: { error in
                print(error)
            })
            .disposed(by: rx.disposeBag)
        
        input.selection
            .map { [unowned self] indexPath -> (String, Bool) in
                let idx = indexPath.row
                return (self.rooms.value[idx].roomCode ?? "", false)
            }
            .bind(to: roomInfo)
            .disposed(by: rx.disposeBag)
        
        roomInfo.asObservable()
            .subscribe(onNext: { [unowned self] info in
                pupagoAPI.join(code: info.code, isPrivate: info.isPrivate)
                    .map { $0.roomCode }
                    .subscribe(onNext: { code in
                        print("Room enter soceck emit needed with \(code ?? "")")
                    }, onError: { error in
                        if let error = error as? APIError {
                            error == .roomNotExist ? print("Alert logic needed room not exist") : print("Alert logic needed")
                        }
                    })
                    .disposed(by: rx.disposeBag)
            }, onError: { error in
                print(error)
            })
            .disposed(by: rx.disposeBag)
        
        let viewText = localize.asDriver()
            .map { (localizeTexts: $0.chattingListViewText, nickname: Application.shared.userName) }
        
        let roomItem = rooms.asDriver(onErrorJustReturn: [])
        
        let created = input.createTrigger
            .asDriver(onErrorJustReturn: ())
            .map { [unowned self] () -> CreateRoomViewModel in
                let viewModel = CreateRoomViewModel()
                viewModel.roomInfo.asObserver()
                    .bind(to: self.roomInfo)
                    .disposed(by: rx.disposeBag)
                return viewModel
            }
        
        let joined = input.joinTrigger
            .asDriver(onErrorJustReturn: ())
            .map { [unowned self] () -> JoinRoomViewModel in
                let viewModel = JoinRoomViewModel()
                viewModel.roomInfo.asObserver()
                    .bind(to: self.roomInfo)
                    .disposed(by: rx.disposeBag)
                return viewModel
            }
        
        let entered = apiJoinValid
            .asDriver(onErrorJustReturn: false)
            .delay(.milliseconds(500))
            .map { _ in ChattingViewModel() }
        
        return Output(viewTexts: viewText,
                      item: roomItem,
                      created: created,
                      joined: joined,
                      entered: entered)
    }
    
}
