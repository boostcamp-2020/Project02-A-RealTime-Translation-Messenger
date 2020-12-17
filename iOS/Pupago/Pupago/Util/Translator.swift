//
//  Translator.swift
//  Pupago
//
//  Created by 김근수 on 2020/12/04.
//

import RxSwift
import RxCocoa

class Translator: NSObject {
    typealias Text = (korean: String, english: String, lang: String)
    
    private let provider: NetworkProviding
    private let detected = PublishRelay<Language>()
    
    init(provider: NetworkProviding) {
        self.provider = provider
    }
    
    func translate(with text: String) -> Observable<Text> {
        guard
            let pupagoApi = provider as? PupagoAPI,
            !text.isEmpty
        else { return Observable.empty() }
        return Observable.create { [unowned self] observer in
            pupagoApi.langDetect(text)
                .flatMap { pupagoApi.translate(source: $0.code, target: $0.opposite, text: text)}
                .subscribe(onNext: { data in
                    let translated = data.message.result.translatedText
                    let code = data.message.result.srcLangType
                    code == "ko" ? observer.onNext((text, translated, "Korean")) : observer.onNext((translated, text, "English"))
                })
                .disposed(by: rx.disposeBag)
            return Disposables.create()
        }
    }
    
}
