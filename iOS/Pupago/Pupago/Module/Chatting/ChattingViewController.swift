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
import Toaster
import RxAnimated

class ChattingViewController: ViewController {

    @IBOutlet weak var languageLabel: UILabel!
    @IBOutlet weak var codeButton: Button!
    @IBOutlet weak var inputText: UITextView!
    @IBOutlet weak var registButton: UIButton!
    @IBOutlet weak var micButton: UIButton!
    @IBOutlet weak var collectionView: UICollectionView!
    @IBOutlet weak var translationTextView: UITextView!
    @IBOutlet weak var inputBarBottomConstraint: NSLayoutConstraint!
    private lazy var rightNavigationItem: UIBarButtonItem = {
        let item = UIBarButtonItem(image: UIImage(systemName: "list.bullet"),
                                   style: .plain,
                                   target: self,
                                   action: nil)
        return item
    }()

    private var didSetupViewConstraints = false
    private var keyboardShown: Bool = false
    private var enterStatus: String = ""
    private var leaveStatus: String = ""
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.navigationItem.rightBarButtonItem = rightNavigationItem
        configureCollectionView()
    }
    
    override func bindViewModel() {
        super.bindViewModel()
        
        guard let viewModel = viewModel as? ChattingViewModel else { return }
        let dataSource = MessageDataSource()
        
        let chatText = inputText.rx.text.orEmpty.asObservable()
        let registTrigger = registButton.rx.tap.asObservable()
        let micTrigger = micButton.rx.tap.asObservable()
        let showParticipantTrigger = rightNavigationItem.rx.tap.asObservable()
        let willLeave = rx.viewWillDisappear.map { _ in }
        
        let input = ChattingViewModel.Input(chatText: chatText,
                                            registTrigger: registTrigger,
                                            micTrigger: micTrigger,
                                            showParticipantTrigger: showParticipantTrigger,
                                            willLeave: willLeave)
        
        let output = viewModel.transform(input)
        
        output.viewText
            .drive(onNext: { [unowned self] text in
                self.languageLabel.text = text.language
                self.enterStatus = text.enter
                self.leaveStatus = text.leave
            })
            .disposed(by: rx.disposeBag)
        
        output.roomInfo
            .drive(onNext: { [unowned self] info in
                self.navigationItem.title = info.title
                self.codeButton.setTitle(info.code, for: .normal)
            })
            .disposed(by: rx.disposeBag)
        
        output.translationViewState
            .bind(to: translationTextView.rx.state)
            .disposed(by: rx.disposeBag)
        
        output.items.asObservable()
            .bind(to: self.collectionView.rx.items(dataSource: dataSource))
            .disposed(by: rx.disposeBag)
        
        output.reset
            .drive(inputText.rx.text)
            .disposed(by: rx.disposeBag)
        
        output.scroll
            .drive(onNext: { [unowned self] _ in
                scrollDownChat()
            })
            .disposed(by: rx.disposeBag)
        
        output.activate
            .drive(onNext: { [unowned self] activate in
                self.registButton.isUserInteractionEnabled = activate
                self.registButton.tintColor = activate ? UIColor(named: "BlueColor") : .lightGray
            })
            .disposed(by: rx.disposeBag)
        
        output.showParticipant
            .drive(onNext: { [unowned self] viewModel in
                self.navigator.show(segue: .participant(viewModel: viewModel),
                                    sender: self,
                                    transition: .slideIn)
            })
            .disposed(by: rx.disposeBag)
        
        output.speeched
            .drive(onNext: { [unowned self] viewModel in
                self.navigator.show(segue: .speech(viewModel: viewModel),
                                    sender: self,
                                    transition: .modal)
                        
            })
            .disposed(by: rx.disposeBag)
        
        output.status
            .drive(onNext: { [unowned self] status in
                var toasterText = status.nickname
                toasterText += status.type == true ? enterStatus : leaveStatus
                status.nickname == "" ? nil : Toast(text: toasterText).show()
            })
            .disposed(by: rx.disposeBag)
    }
    
    override func registerForKeyboardNotifications() {
        super.registerForKeyboardNotifications()
        
        NotificationCenter.default
            .addObserver(self, selector: #selector(keyboardWillShow),
                               name: UIResponder.keyboardWillShowNotification,
                               object: nil)
        NotificationCenter.default
            .addObserver(self, selector: #selector(keyboardWillHide),
                               name: UIResponder.keyboardWillHideNotification,
                               object: nil)
    }
    
    func resetTranslationView() {
        self.translationTextView.text = ""
        self.translationTextView.isHidden = true
    }
}

extension ChattingViewController {
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
    
    private func scrollDownChat() {
        self.view.layoutIfNeeded()
        
        let lastItemIndex = self.collectionView.numberOfItems(inSection: 0) - 1
        if lastItemIndex < 0 { return }
        
        let indexPath = IndexPath(row: lastItemIndex, section: 0)
        self.collectionView.scrollToItem(at: indexPath, at: .bottom, animated: true)
    }
    
    @objc func keyboardWillShow(notification: NSNotification) {
        if let keyboardSize = (notification.userInfo?[UIResponder.keyboardFrameEndUserInfoKey] as? NSValue)?.cgRectValue {
            if keyboardSize.height == 0.0 || keyboardShown { return }
            
            let bottomPadding = self.view.safeAreaInsets.bottom
            inputBarBottomConstraint.constant = keyboardSize.height - bottomPadding
            
            UIView.animate(withDuration: 0) {
                self.collectionView.contentInset.bottom = keyboardSize.height - bottomPadding
                self.collectionView.verticalScrollIndicatorInsets.bottom = self.collectionView.contentInset.bottom - bottomPadding
                self.keyboardShown = true
                self.scrollDownChat()
            }
        }
        
    }
    
    @objc func keyboardWillHide(notification: NSNotification) {
        if !keyboardShown { return }
        self.inputBarBottomConstraint.constant = 0
            
        UIView.animate(withDuration: 0) {
            self.collectionView.contentInset.bottom = 0
            self.collectionView.verticalScrollIndicatorInsets.bottom = self.collectionView.contentInset.bottom
            self.keyboardShown = false
            self.scrollDownChat()
            self.view.layoutIfNeeded()
        }
        
    }
    
    @objc func dismissKeyboard(_ : NSNotification) {
        self.view.endEditing(true)
    }
    
}
