//
//  ChattingViewController.swift
//  Pupago
//
//  Created by 김근수 on 2020/11/25.
//

import UIKit
import RxSwift
import RxCocoa
import RxDataSources

class ChattingViewController: ViewController {

    @IBOutlet weak var languageLabel: UILabel!
    @IBOutlet weak var codeButton: Button!
    @IBOutlet weak var inputText: UITextView!
    @IBOutlet weak var registButton: UIButton!
    @IBOutlet weak var collectionView: UICollectionView!
    @IBOutlet weak var inputBar: UIView!
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
        let willLeave = rx.viewWillDisappear.map { _ in }
        let input = ChattingViewModel.Input(chatText: chatText,
                                            registTrigger: registTrigger,
                                            willLeave: willLeave)
        
        let output = viewModel.transform(input)
        
        output.viewText
            .drive(onNext: { [unowned self] text in
                self.languageLabel.text = text.language
            })
            .disposed(by: rx.disposeBag)
        
        output.roomInfo
            .drive(onNext: { [unowned self] info in
                self.navigationItem.title = info.title
                self.codeButton.setTitle(info.code, for: .normal)
            })
            .disposed(by: rx.disposeBag)
        
        let dataSource = RxCollectionViewSectionedReloadDataSource<MessageSection>(configureCell: { _, collectionView, indexPath, item in
            if item.senderId == SocketIOManager.shared.socket.sid {
                guard let cell = collectionView.dequeueReusableCell(withReuseIdentifier: MyChattingCell.identifier,
                                                                    for: indexPath) as? MyChattingCell
                else { return UICollectionViewCell() }
                cell.chatTextField.text = item.korean
                cell.createAtLabel.text = DateManager.dateFormat(of: Date())
                return cell
            } else {
                guard let cell = collectionView.dequeueReusableCell(withReuseIdentifier: OthersChattingCell.identifier,
                                                                    for: indexPath) as? OthersChattingCell
                else { return UICollectionViewCell() }
                cell.originChatLabel.text = item.korean
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
