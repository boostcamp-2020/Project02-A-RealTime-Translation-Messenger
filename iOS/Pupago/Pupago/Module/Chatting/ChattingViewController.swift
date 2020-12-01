//
//  ChattingViewController.swift
//  Pupago
//
//  Created by 김근수 on 2020/11/25.
//

import UIKit
import RxSwift
import RxCocoa
import RxKeyboard
import RxDataSources

class ChattingViewController: ViewController {

    @IBOutlet weak var languageLabel: UILabel!
    @IBOutlet weak var inputText: UITextView!
    @IBOutlet weak var registButton: UIButton!
    @IBOutlet weak var collectionView: UICollectionView!
    @IBOutlet weak var bottomConstraint: NSLayoutConstraint!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        configureCollectionView()
    }
    
    override func bindViewModel() {
        super.bindViewModel()
        
        guard let viewModel = viewModel as? ChattingViewModel else { return }
        
        let chatText = inputText.rx.text.orEmpty.asObservable()
        let registTrigger = registButton.rx.tap.map { _ in }
        
        let input = ChattingViewModel.Input(chatText: chatText,
                                        registTrigger: registTrigger)
        
        let output = viewModel.transform(input)
        
        RxKeyboard.instance.visibleHeight.drive(onNext: { [unowned self] visibleHeight in
      
            if visibleHeight == 0 {
                self.bottomConstraint.constant = 0
            } else {
                let height = visibleHeight - self.view.safeAreaInsets.bottom
                self.bottomConstraint.constant = height
            }
            
            self.view.setNeedsLayout()
            self.view.layoutIfNeeded()
        }).disposed(by: rx.disposeBag)
        
        let dataSource = RxCollectionViewSectionedReloadDataSource<MessageSection>(configureCell: { _, collectionView, indexPath, item in
            switch item.user {
            case .mine:
                let cell = collectionView.dequeueReusableCell(withReuseIdentifier: item.user.rawValue, for: indexPath) as! MyChattingCell
                cell.chattingLabel.text = item.messageItems.text
                
                return cell
            case .others:
                let cell = collectionView.dequeueReusableCell(withReuseIdentifier: item.user.rawValue, for: indexPath) as! OthersChattingCell
                cell.originChatLabel.text = item.messageItems.text
                
                return cell
            }
        })
        
        output.items.asObservable()
            .bind(to: self.collectionView.rx.items(dataSource: dataSource))
            .disposed(by: rx.disposeBag)
        
    }
}

extension ChattingViewController {
    func configureCollectionView() {
        let size = NSCollectionLayoutSize(widthDimension: .fractionalWidth(1.0),
                                          heightDimension: .estimated(33))
        let item = NSCollectionLayoutItem(layoutSize: size)
        let group = NSCollectionLayoutGroup.horizontal(layoutSize: size, subitem: item, count: 1)
        let section = NSCollectionLayoutSection(group: group)
        section.interGroupSpacing = 10.0
        section.contentInsets = NSDirectionalEdgeInsets(top: 0, leading: 0, bottom: 0, trailing: 0)
        
        let layout = UICollectionViewCompositionalLayout(section: section)
        
        self.collectionView.collectionViewLayout = layout
        self.collectionView.alwaysBounceVertical = true
        self.collectionView.keyboardDismissMode = .interactive
    }
}
