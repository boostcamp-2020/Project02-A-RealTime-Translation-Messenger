//
//  Translator.swift
//  Pupago
//
//  Created by 김근수 on 2020/12/04.
//

import Foundation
import RxSwift
import RxCocoa

class Translator: NSObject {
    typealias Text = (korean: String, english: String)
    
    private let provider: NetworkProviding
    private let detected = PublishRelay<Language>()
    
    init(provider: NetworkProviding) {
        self.provider = provider
    }
    
    func translate(with text: String) -> Observable<Text> {
        guard let pupagoApi = provider as? PupagoAPI else { return Observable.empty() }
        return Observable.create { [unowned self] observer in
            pupagoApi.langDetect(text)
                .flatMap { pupagoApi.translate(source: $0.code, target: $0.opposite, text: text)}
                .subscribe(onNext: { data in
                    let translated = data.message.result.translatedText
                    let code = data.message.result.srcLangType
                    code == "ko" ? observer.onNext((text, translated)) : observer.onNext((translated, text))
                })
                .disposed(by: rx.disposeBag)
            return Disposables.create()
        }
    }
    
}
