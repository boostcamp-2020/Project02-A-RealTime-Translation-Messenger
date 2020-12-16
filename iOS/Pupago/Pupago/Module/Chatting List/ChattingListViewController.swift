//
//  ChattingMainViewController.swift
//  Pupago
//
//  Created by kimn on 2020/11/24.
//

import RxSwift
import RxCocoa
import Kingfisher

final class ChattingListViewController: ViewController {
    
    @IBOutlet weak var nicknameLabel: UILabel!
    @IBOutlet weak var languageLabel: UILabel!
    @IBOutlet weak var chatroomLabel: UILabel!
    @IBOutlet weak var thumbnailImageView: UIImageView!
    @IBOutlet weak var joinButton: UIButton!
    @IBOutlet weak var createButton: UIButton!
    @IBOutlet weak var collectionView: UICollectionView!
    @IBOutlet weak var placeHolderView: UIView!
    @IBOutlet weak var placeHolderLabel: UILabel!
    
    private let thumbnailTapGesture = UITapGestureRecognizer()
    private let placeHolderTapGesture = UITapGestureRecognizer()
    private let refreshControl = UIRefreshControl()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        configureCollectionView()
        configureGesture()
    }
    
    override func bindViewModel() {
        super.bindViewModel()
        guard let viewModel = viewModel as? ChattingListViewModel else { return }
        
        let input = ChattingListViewModel.Input(viewWillAppear: rx.viewWillAppear.asObservable(),
                                                createButtonDidTap: createButton.rx.tap.asObservable(),
                                                joinButtonDidTap: joinButton.rx.tap.asObservable(),
                                                reloadThumbnailDidTap: thumbnailTapGesture.rx.event.map {_ in},
                                                reloadRoomDidTap: refreshControl.rx.controlEvent(.valueChanged).map {_ in},
                                                placeHolderDidTap: placeHolderTapGesture.rx.event.map {_ in},
                                                roomDidSelect: collectionView.rx.itemSelected.map { $0 })
        let output = viewModel.transform(input)
        
        output.viewTexts
            .drive(onNext: { [unowned self] (localized, nickname) in
                nicknameLabel.text = nickname
                navigationItem.title = localized.title
                languageLabel.text = localized.language
                chatroomLabel.text = localized.chatroom
                placeHolderLabel.text = localized.blanking
            })
            .disposed(by: rx.disposeBag)
        
        output.roomList
            .asObservable()
            .bind(to: collectionView.rx
                    .items(cellIdentifier: ChattingListCell.identifier,
                           cellType: ChattingListCell.self)) { row, item, cell in
                cell.confiture(with: item)
            }
            .disposed(by: rx.disposeBag)
        
        output.isReloading
            .bind(animated: refreshControl.rx.isRefreshing)
            .disposed(by: rx.disposeBag)
        
        output.thumbnailImage
            .bind(animated: thumbnailImageView.rx.animated.fade(duration: 0.2).image)
            .disposed(by: rx.disposeBag)
        
        output.needShake
            .map { !$0 }
            .bind(animated: placeHolderView.rx.animated.tick(duration: 0.6).isHidden)
            .disposed(by: rx.disposeBag)
        
        output.showCreateRoomView
            .emit(onNext: { [unowned self] viewModel in
                navigator.show(segue: .createRoom(viewModel: viewModel),
                               sender: self,
                               transition: .present)
            })
            .disposed(by: rx.disposeBag)
        
        output.showJoinRoomView
            .emit(onNext: { [unowned self] viewModel in
                navigator.show(segue: .joinRoom(viewModel: viewModel),
                               sender: self,
                               transition: .present)
            })
            .disposed(by: rx.disposeBag)
        
        output.showChattingView
            .emit(onNext: { [unowned self] viewModel in
                navigator.show(segue: .chatting(viewModel: viewModel),
                               sender: self,
                               transition: .navigation)
            })
            .disposed(by: rx.disposeBag)
    }
    
}

private extension ChattingListViewController {
    
    func configureCollectionView() {
        let size = NSCollectionLayoutSize(widthDimension: .fractionalWidth(1.0),
                                          heightDimension: .estimated(33))
        let item = NSCollectionLayoutItem(layoutSize: size)
        let group = NSCollectionLayoutGroup.horizontal(layoutSize: size, subitem: item, count: 1)
        let section = NSCollectionLayoutSection(group: group)
        section.interGroupSpacing = 20.0
        section.contentInsets = NSDirectionalEdgeInsets(top: 10, leading: 20, bottom: 10, trailing: 20)
        
        let layout = UICollectionViewCompositionalLayout(section: section)
        
        self.collectionView.collectionViewLayout = layout
        collectionView.refreshControl = refreshControl
    }
    
    func configureGesture() {
        thumbnailImageView.isUserInteractionEnabled = true
        thumbnailImageView.addGestureRecognizer(thumbnailTapGesture)
        placeHolderView.addGestureRecognizer(placeHolderTapGesture)
    }
    
}
