//
//  KingFisher+Rx.swift
//  Pupago
//
//  Created by 김근수 on 2020/12/09.
//

import RxSwift
import Kingfisher

public extension Reactive where Base: KingfisherManager {
    
    func image(url: String) -> Observable<UIImage> {
        return Observable.create { observer in
            guard let url = URL(string: url) else { return Disposables.create() }
            let rsc = ImageResource(downloadURL: url)
            base.retrieveImage(with: rsc) { result in
                switch result {
                case .success(let imgResult):
                    observer.onNext(imgResult.image)
                case .failure(let error):
                    observer.onError(error)
                }
            }
            return Disposables.create()
        }
    }
    
}

extension KingfisherManager: ReactiveCompatible {}
