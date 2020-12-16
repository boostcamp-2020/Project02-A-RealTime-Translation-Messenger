//
//  ChattingMainViewModel.swift
//  Pupago
//
//  Created by kimn on 2020/11/24.
//

import RxSwift
import RxCocoa
import Kingfisher

final class ChattingListViewModel: ViewModel, ViewModelType {
    
    typealias RoomInfo = (code: String, isPrivate: Bool)
    
    // MARK: - Input
    
    struct Input {
        let viewWillAppear: Observable<Bool>
        let createButtonDidTap: Observable<Void>
        let joinButtonDidTap: Observable<Void>
        let reloadThumbnailDidTap: Observable<Void>
        let reloadRoomDidTap: Observable<Void>
        let placeHolderDidTap: Observable<Void>
        let roomDidSelect: Observable<IndexPath>
    }
    
    // MARK: - Output
    
    struct Output {
        let viewTexts: Driver<(localizeTexts: Localize.ChatListViewText, nickname: String)>
        let roomList: Driver<[Room]>
        let thumbnailImage: Driver<UIImage?>
        let isReloading: Driver<Bool>
        let needShake: Driver<Bool>
        let showCreateRoomView: Signal<CreateRoomViewModel>
        let showJoinRoomView: Signal<JoinRoomViewModel>
        let showChattingView: Signal<ChattingViewModel>
    }
    
    // MARK: - State
    
    private let rooms = BehaviorRelay<[Room]>(value: [])
    let roomInfo = PublishRelay<RoomInfo>()
    private let thumbnailImage = PublishRelay<UIImage?>()
    private let socketEntered = PublishRelay<Room?>()
    private let isRefreshing = BehaviorRelay<Bool>(value: false)
    private let isBlank = PublishRelay<Bool>()
    
    // MARK: - Transform
    
    func transform(_ input: Input) -> Output {
        
        fetchThumbnail()
            .bind(to: thumbnailImage)
            .disposed(by: rx.disposeBag)
        
        input.reloadThumbnailDidTap
            .flatMap { [unowned self] in fetchThumbnail() }
            .bind(to: thumbnailImage)
            .disposed(by: rx.disposeBag)
        
        Observable.of(input.reloadRoomDidTap, input.placeHolderDidTap, input.viewWillAppear.map {_ in}).merge()
            .debounce(.milliseconds(500), scheduler: MainScheduler.instance)
            .flatMap { [unowned self] in provider.rooms() }
            .subscribe(onNext: {[unowned self] result in
                updateRoomList(result.roomList)
            }, onError: { error in
                print(error)
            })
            .disposed(by: rx.disposeBag)
        
        input.roomDidSelect
            .map { [unowned self] indexPath -> (String, Bool) in
                let idx = indexPath.row
                return (rooms.value[idx].roomCode ?? "", false)
            }
            .bind(to: roomInfo)
            .disposed(by: rx.disposeBag)
        
        roomInfo
            .subscribe(onNext: { [unowned self] info in
                provider.join(code: info.code, isPrivate: info.isPrivate)
                    .subscribe(onNext: { [unowned self] room in
                        Application.shared.currentRoomCode = room.roomCode ?? ""
                            socketManager.enterChatroom(roomCode: room.roomCode ?? "")
                            socketEntered.accept(room)
                        }, onError: { error in
                            if let error = error as? APIError {
                                error == .roomNotExist ? print("Alert logic needed room not exist") :
                                print("Alert logic needed")
                            }})
                    .disposed(by: rx.disposeBag)
                })
            .disposed(by: rx.disposeBag)
        
        let viewText = localize.asDriver()
            .map { (localizeTexts: $0.chattingListViewText, nickname: Application.shared.userName) }
        
        let showCreateView = input.createButtonDidTap.asSignal(onErrorJustReturn: ())
            .map { [unowned self] () -> CreateRoomViewModel in
                let viewModel = CreateRoomViewModel(provider: provider)
                viewModel.roomInfo.asObserver()
                    .bind(to: roomInfo)
                    .disposed(by: rx.disposeBag)
                return viewModel
            }
        
        let showJoinView = input.joinButtonDidTap.asSignal(onErrorJustReturn: ())
            .map { [unowned self] () -> JoinRoomViewModel in
                let viewModel = JoinRoomViewModel(provider: provider)
                viewModel.roomInfo.asObserver()
                    .bind(to: roomInfo)
                    .disposed(by: rx.disposeBag)
                return viewModel
            }
        
        let showChatView = socketEntered.asSignal(onErrorJustReturn: nil)
            .delay(.milliseconds(500))
            .map { [unowned self] room -> ChattingViewModel in
                let viewModel = ChattingViewModel(provider: provider)
                viewModel.roomInfo.accept((title: room?.title, code: room?.roomCode))
                return viewModel
            }
        
        return Output(viewTexts: viewText,
                      roomList: rooms.asDriver(),
                      thumbnailImage: thumbnailImage.asDriver(onErrorJustReturn: nil),
                      isReloading: isRefreshing.asDriver(),
                      needShake: isBlank.asDriver(onErrorJustReturn: false),
                      showCreateRoomView: showCreateView,
                      showJoinRoomView: showJoinView,
                      showChattingView: showChatView)
    }
    
}

private extension ChattingListViewModel {
    
    func fetchThumbnail() -> Observable<UIImage> {
        return provider.profile()
            .flatMap { profile -> Observable<UIImage> in
                Application.shared.profile = profile.imageLink
                return KingfisherManager.shared.rx.image(url: profile.imageLink)
            }
    }
    
    func updateRoomList(_ roomList: [Room]) {
        rooms.accept(roomList)
        isBlank.accept(roomList.isEmpty)
        isRefreshing.accept(false)
    }
}
