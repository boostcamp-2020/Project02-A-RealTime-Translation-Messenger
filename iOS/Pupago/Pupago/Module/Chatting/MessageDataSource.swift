//
//  MessageDataSource.swift
//  Pupago
//
//  Created by 김근수 on 2020/12/04.
//

import Foundation
import RxDataSources

class MessageDataSource: RxCollectionViewSectionedReloadDataSource<MessageSection> {
    
    init() {
        super.init(configureCell: { _, collectionView, indexPath, item in
            if item.senderId == SocketIOManager.shared.socket.sid {
                guard let cell = collectionView.dequeueReusableCell(withReuseIdentifier: MyChattingCell.identifier,
                                                                    for: indexPath) as? MyChattingCell
                else { return UICollectionViewCell() }
                cell.configure(with: item)
                return cell
            } else {
                guard let cell = collectionView.dequeueReusableCell(withReuseIdentifier: OthersChattingCell.identifier,
                                                                    for: indexPath) as? OthersChattingCell
                else { return UICollectionViewCell() }
                cell.configure(with: item)
                return cell
            }
        })
    }
    
}
