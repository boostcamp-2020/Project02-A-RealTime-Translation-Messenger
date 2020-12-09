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
import Kingfisher

final class ChattingListViewModel: ViewModel, ViewModelType {
    
    struct Input {
        let createTrigger: Observable<Void>
        let joinTrigger: Observable<Void>
        let imageReload: Observable<Void>
        let reloadRoom: Observable<Void>
        let selection: Observable<IndexPath>
    }
    
    struct Output {
        let viewTexts: Driver<(localizeTexts: Localize.ChatListViewText, nickname: String)>
        let item: Driver<[Room]>
        let profileImage: Driver<UIImage?>
        let created: Driver<CreateRoomViewModel>
        let joined: Driver<JoinRoomViewModel>
        let entered: Driver<ChattingViewModel>
        let isReloading: Driver<Bool>
    }
    
    private let rooms = BehaviorRelay<[Room]>(value: [])
    private let roomInfo = PublishRelay<(code: String, isPrivate: Bool)>()
    private let socketEntered = PublishRelay<Room?>()
    private let isRefreshing = BehaviorRelay<Bool>(value: false)
    private let profileImage = PublishRelay<UIImage?>()
    
    func transform(_ input: Input) -> Output {
        
        let pupagoAPI = PupagoAPI()
        let socketManager = SocketIOManager.shared
        
        // MARK: - Profile Image
        
        pupagoAPI.profile()
            .flatMap { profile -> Observable<UIImage> in
                Application.shared.profile = profile.imageLink
                return KingfisherManager.shared.rx.image(url: profile.imageLink)
            }
            .subscribe(onNext: { [unowned self] image in
                profileImage.accept(image)
            })
            .disposed(by: rx.disposeBag)
        
        input.imageReload
            .flatMap {pupagoAPI.profile()}
            .flatMap { profile -> Observable<UIImage> in
                Application.shared.profile = profile.imageLink
                return KingfisherManager.shared.rx.image(url: profile.imageLink)
            }
            .subscribe(onNext: { [unowned self] image in
                profileImage.accept(image)
            })
            .disposed(by: rx.disposeBag)
            
        // MARK: - Rooms
        
        pupagoAPI.rooms()
            .subscribe(onNext: { [unowned self] result in
                self.rooms.accept(result.roomList)
            }, onError: { error in
                print(error)
            })
            .disposed(by: rx.disposeBag)
        
        input.reloadRoom
            .debounce(.milliseconds(500), scheduler: MainScheduler.instance)
            .flatMapLatest { pupagoAPI.rooms()}
            .subscribe(onNext: {[unowned self] result in
                rooms.accept(result.roomList)
                isRefreshing.accept(false)
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
                    .subscribe(onNext: { room in
                        socketManager.enterChatroom(roomCode: room.roomCode ?? "")
                        self.socketEntered.accept(room)
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
        
        let entered = socketEntered
            .asDriver(onErrorJustReturn: nil)
            .delay(.milliseconds(500))
            .map { room -> ChattingViewModel in
                let viewModel = ChattingViewModel()
                viewModel.roomInfo.accept((title: room?.title, code: room?.roomCode))
                return viewModel
            }
        
        return Output(viewTexts: viewText,
                      item: roomItem,
                      profileImage: profileImage.asDriver(onErrorJustReturn: nil),
                      created: created,
                      joined: joined,
                      entered: entered, isReloading: isRefreshing.asDriver())
      
    }
    
}
