//
//  ChattingMainViewController.swift
//  Pupago
//
//  Created by kimn on 2020/11/24.
//

import Foundation
import RxSwift
import RxCocoa

final class ChattingListViewController: ViewController {
    
    @IBOutlet weak var nicknameLabel: UILabel!
    @IBOutlet weak var languageLabel: UILabel!
    @IBOutlet weak var chatroomLabel: UILabel!
    @IBOutlet weak var thumbnailImageView: UIImageView!
    @IBOutlet weak var joinButton: UIButton!
    @IBOutlet weak var createButton: UIButton!
    @IBOutlet weak var collectionView: UICollectionView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        configureCollectionView()
    }
    
    override func bindViewModel() {
        super.bindViewModel()
        
        guard let viewModel = viewModel as? ChattingListViewModel else { return }
        
        let createTrigger = createButton.rx.tap.asObservable()
        let joinTrigger = joinButton.rx.tap.asObservable()
        let selection = collectionView.rx.itemSelected.map { $0 }
        
        let input = ChattingListViewModel.Input(createTrigger: createTrigger,
                                                joinTrigger: joinTrigger,
                                                selection: selection)
        
        let output = viewModel.transform(input)
        
        output.viewTexts
            .drive(onNext: { [unowned self] (localized, nickname) in
                self.nicknameLabel.text = nickname
                self.navigationItem.title = localized.title
                self.languageLabel.text = localized.language
                self.chatroomLabel.text = localized.chatroom
            })
            .disposed(by: rx.disposeBag)
        
        output.item
            .asObservable()
            .bind(to: collectionView.rx
                    .items(cellIdentifier: ChattingListCell.identifier,
                           cellType: ChattingListCell.self)) { row, item, cell in
                cell.confiture(with: item)
            }
            .disposed(by: rx.disposeBag)
        
        output.created
            .drive(onNext: { [unowned self] viewModel in
                self.navigator.show(segue: .createRoom(viewModel: viewModel),
                                     sender: self,
                                     transition: .present)
            })
            .disposed(by: rx.disposeBag)
        
        output.joined
            .drive(onNext: { [unowned self] viewModel in
                self.navigator.show(segue: .joinRoom(viewModel: viewModel),
                                     sender: self,
                                     transition: .present)
            })
            .disposed(by: rx.disposeBag)
        
        output.entered
            .drive(onNext: { [unowned self] viewModel in
                self.navigator.show(segue: .chatting(viewModel: viewModel),
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
    }
    
}
