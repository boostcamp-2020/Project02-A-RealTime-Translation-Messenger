//
//  ChattingViewController.swift
//  Pupago
//
//  Created by 김근수 on 2020/11/25.
//

import RxSwift
import RxCocoa
import RxDataSources
import RxAnimated
import Toaster

class ChattingViewController: ViewController {
    
    // MARK: - IBOutlet
    
    @IBOutlet weak var languageLabel: UILabel!
    @IBOutlet weak var codeButton: Button!
    @IBOutlet weak var inputText: UITextView!
    @IBOutlet weak var sendButton: UIButton!
    @IBOutlet weak var micButton: UIButton!
    @IBOutlet weak var scanButton: UIButton!
    @IBOutlet weak var collectionView: UICollectionView!
    @IBOutlet weak var translationTextView: UITextView!
    @IBOutlet weak var inputBarBottomConstraint: NSLayoutConstraint!
    
    // MARK: - Properties
    
    private lazy var rightNavigationItem: UIBarButtonItem = {
        let item = UIBarButtonItem(image: UIImage(systemName: "list.bullet"),
                                   style: .plain,
                                   target: self,
                                   action: nil)
        return item
    }()
    
    // MARK: - Lifecycle
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.navigationItem.rightBarButtonItem = rightNavigationItem
        configureCollectionView()
        configureToasterView()
        bindKeyboard()
    }
    
    // MARK: Bind ViewModel
    
    override func bindViewModel() {
        super.bindViewModel()
        guard let viewModel = viewModel as? ChattingViewModel else { return }
        
        let dataSource = MessageDataSource()
        
        let input = ChattingViewModel.Input(chatText: inputText.rx.text.orEmpty.asObservable(),
                                            codeButtonDidTap: codeButton.rx.tap.asObservable(),
                                            sendButtonDidTap: sendButton.rx.tap.asObservable(),
                                            micButtonDidTap: micButton.rx.tap.asObservable(),
                                            scanButtonDidTap: scanButton.rx.tap.asObservable(),
                                            participantButtonDidTap: rightNavigationItem.rx.tap.asObservable(),
                                            viewWillDisappear: rx.viewWillDisappear.map {_ in})
        let output = viewModel.transform(input)
        
        output.viewTexts
            .map { $0.language }
            .drive(languageLabel.rx.text)
            .disposed(by: rx.disposeBag)
        
        output.roomInfo
            .drive(onNext: { [unowned self] info in
                navigationItem.title = info.title
                codeButton.setTitle(info.code, for: .normal)
            })
            .disposed(by: rx.disposeBag)
        
        output.translationViewState
            .bind(to: translationTextView.rx.state)
            .disposed(by: rx.disposeBag)
        
        output.chats
            .bind(to: self.collectionView.rx.items(dataSource: dataSource))
            .disposed(by: rx.disposeBag)
        
        output.needResetInput
            .map { "" }
            .bind(to: inputText.rx.text)
            .disposed(by: rx.disposeBag)
        
        output.needScrollDown
            .observeOn(MainScheduler.instance)
            .subscribe(onNext: { [unowned self] _ in
                scrollDownChat()
            })
            .disposed(by: rx.disposeBag)
        
        output.isActive
            .bind(animated: sendButton.rx.isActive)
            .disposed(by: rx.disposeBag)
        
        output.toasterMessage
            .observeOn(MainScheduler.instance)
            .subscribe(onNext: { msg in
                Toast(text: msg).show()
            })
            .disposed(by: rx.disposeBag)
        
        output.showParticipantView
            .emit(onNext: { [unowned self] viewModel in
                self.navigator.show(segue: .participant(viewModel: viewModel),
                                    sender: self,
                                    transition: .slideIn)
            })
            .disposed(by: rx.disposeBag)
        
        output.showSpeechView
            .emit(onNext: { [unowned self] viewModel in
                self.navigator.show(segue: .speech(viewModel: viewModel),
                                    sender: self,
                                    transition: .modal)
                
            })
            .disposed(by: rx.disposeBag)
        
        output.showScanView
            .emit(onNext: { [unowned self] viewModel in
                navigator.show(segue: .scan(viewModel: viewModel),
                               sender: self,
                               transition: .modal)
            })
            .disposed(by: rx.disposeBag)
    }
    
}

private extension ChattingViewController {
    
    func configureCollectionView() {
        let size = NSCollectionLayoutSize(widthDimension: .fractionalWidth(1.0),
                                          heightDimension: .estimated(74))
        let item = NSCollectionLayoutItem(layoutSize: size)
        let group = NSCollectionLayoutGroup.horizontal(layoutSize: size, subitem: item, count: 1)
        let section = NSCollectionLayoutSection(group: group)
        section.interGroupSpacing = 10.0
        section.contentInsets = NSDirectionalEdgeInsets(top: 0, leading: 0, bottom: 0, trailing: 0)
        
        let layout = UICollectionViewCompositionalLayout(section: section)
        
        self.collectionView.collectionViewLayout = layout
        self.collectionView.alwaysBounceVertical = true
        self.collectionView.keyboardDismissMode = .interactive
        
        let tap = UITapGestureRecognizer(target: self, action: #selector(dismissKeyboard))
        self.collectionView.addGestureRecognizer(tap)
    }
    
    func configureToasterView() {
        let marginTop: CGFloat = 200
        let frame = self.view.safeAreaLayoutGuide.layoutFrame
        
        ToastView.appearance().bottomOffsetPortrait = max(frame.width, frame.height) - marginTop
        ToastView.appearance().bottomOffsetLandscape = min(frame.width, frame.height) - marginTop
    }
    
    private func scrollDownChat() {
        self.view.layoutIfNeeded()
        
        let lastItemIndex = self.collectionView.numberOfItems(inSection: 0) - 1
        if lastItemIndex < 0 { return }
        
        let indexPath = IndexPath(row: lastItemIndex, section: 0)
        self.collectionView.scrollToItem(at: indexPath, at: .bottom, animated: true)
    }
    
    @objc func dismissKeyboard(_ : NSNotification) {
        self.view.endEditing(true)
    }
    
}

extension ChattingViewController: KeyboardHandleable {
    
    func bindKeyboard() {
        keyboardHeight
            .observeOn(MainScheduler.instance)
            .subscribe(onNext: { [unowned self] keyboardHeight in
                let bottomPadding = view.safeAreaInsets.bottom
                let constraintHeight = keyboardHeight == 0 ? 0 : keyboardHeight - bottomPadding
                let bottomHeight = keyboardHeight == 0 ? 0 : bottomPadding
                
                inputBarBottomConstraint.constant = constraintHeight
                collectionView.contentInset.bottom = constraintHeight
                collectionView.verticalScrollIndicatorInsets.bottom = collectionView.contentInset.bottom - bottomHeight
                view.layoutIfNeeded()
                scrollDownChat()
            })
            .disposed(by: rx.disposeBag)
    }
    
}
