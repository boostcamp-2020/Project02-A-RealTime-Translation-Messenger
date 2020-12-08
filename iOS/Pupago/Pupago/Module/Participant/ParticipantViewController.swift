//
//  ParticipantViewController.swift
//  Pupago
//
//  Created by 김근수 on 2020/12/05.
//

import UIKit

class ParticipantViewController: ViewController {
    
    @IBOutlet weak var collectionView: UICollectionView!
    @IBOutlet weak var dismissButton: UIButton!
    @IBOutlet weak var titleLabel: UILabel!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        configureCollectionViewLayout()
    }
    
    override func bindViewModel() {
        super.bindViewModel()
        
        guard let viewModel = viewModel as? ParticipantViewModel else { return }
        let viewWillAppear = rx.viewWillAppear.map { _ in }
        let dismissTrigger = dismissButton.rx.tap.asObservable()
        
        let input = ParticipantViewModel.Input(viewWillAppear: viewWillAppear,
                                               dismissTrigger: dismissTrigger)
        let output = viewModel.transform(input)
        
        output.viewTexts
            .drive(onNext: { [unowned self] texts in
                self.titleLabel.text = texts.title
            })
            .disposed(by: rx.disposeBag)
        
        output.item
            .bind(to: collectionView.rx.items(
                    cellIdentifier: ParticipantCell.identifier,
                    cellType: ParticipantCell.self)) { row, item, cell in
                cell.configure(with: item)
            }
            .disposed(by: rx.disposeBag)
        
        output.dismiss
            .drive(onNext: { [unowned self] in
                self.navigator.dismiss(sender: self)
            })
            .disposed(by: rx.disposeBag)
    }
}

extension ParticipantViewController {
    
    private func configureCollectionViewLayout() {
        let size = NSCollectionLayoutSize(widthDimension: .fractionalWidth(1.0),
                                          heightDimension: .absolute(70))
        let item = NSCollectionLayoutItem(layoutSize: size)
        let group = NSCollectionLayoutGroup.horizontal(layoutSize: size, subitem: item, count: 1)
        let section = NSCollectionLayoutSection(group: group)
        section.interGroupSpacing = 20.0
        section.contentInsets = NSDirectionalEdgeInsets(top: 12, leading: 0, bottom: 0, trailing: 0)
        
        let layout = UICollectionViewCompositionalLayout(section: section)
        
        self.collectionView.collectionViewLayout = layout
    }
    
}
