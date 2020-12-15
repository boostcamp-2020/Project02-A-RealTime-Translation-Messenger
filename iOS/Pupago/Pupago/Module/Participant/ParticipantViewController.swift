//
//  ParticipantViewController.swift
//  Pupago
//
//  Created by 김근수 on 2020/12/05.
//

import UIKit

final class ParticipantViewController: ViewController {
    
    // MARK: - IBOutlet
    
    @IBOutlet weak var collectionView: UICollectionView!
    @IBOutlet weak var titleLabel: UILabel!
    @IBOutlet weak var closeButton: UIButton!
    
    // MARK: - Properties
    
    private let tapGesture = UITapGestureRecognizer()
    
    // MARK: - LifeCycle
    
    override func viewDidLoad() {
        super.viewDidLoad()
        configureCollectionViewLayout()
        configureGesture()
    }
    
    // MARK: - Bind ViewModel
    
    override func bindViewModel() {
        super.bindViewModel()
        guard let viewModel = viewModel as? ParticipantViewModel else { return }
        
        let input = ParticipantViewModel.Input(viewWillAppear: rx.viewWillAppear.map {_ in},
                                               dimmingViewDidTap: tapGesture.rx.event.map {_ in},
                                               closeButtonDidTap: closeButton.rx.tap.asObservable())
        let output = viewModel.transform(input)
        
        output.viewTexts
            .drive(onNext: { [unowned self] texts in
                titleLabel.text = texts.title
            })
            .disposed(by: rx.disposeBag)
        
        output.participants
            .bind(to: collectionView.rx.items(
                    cellIdentifier: ParticipantCell.identifier,
                    cellType: ParticipantCell.self)) { row, item, cell in
                cell.configure(with: item)
            }
            .disposed(by: rx.disposeBag)
        
        output.dismiss
            .emit(onNext: { [unowned self] in
                navigator.dismiss(sender: self)
            })
            .disposed(by: rx.disposeBag)
    }
}

private extension ParticipantViewController {
    
    func configureCollectionViewLayout() {
        let size = NSCollectionLayoutSize(widthDimension: .fractionalWidth(1.0),
                                          heightDimension: .absolute(60))
        let item = NSCollectionLayoutItem(layoutSize: size)
        let group = NSCollectionLayoutGroup.horizontal(layoutSize: size, subitem: item, count: 1)
        let section = NSCollectionLayoutSection(group: group)
        section.interGroupSpacing = 20.0
        section.contentInsets = NSDirectionalEdgeInsets(top: 12, leading: 0, bottom: 0, trailing: 0)
        
        let layout = UICollectionViewCompositionalLayout(section: section)
        
        self.collectionView.collectionViewLayout = layout
    }
    
    func configureGesture() {
        guard let helper = transitioningDelegate as? SlidInTransitionHelper else { return }
        
        let dimmingView = helper.transition.dimmingView
        dimmingView.addGestureRecognizer(tapGesture)
    }
    
}
