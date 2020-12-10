//
//  PapagoEndpoint.swift
//  Pupago
//
//  Created by 김근수 on 2020/12/03.
//

import Alamofire

enum PapagoEndpoint {
    case detect(text: String)
    case translate(source: String, target: String, text: String)
}

extension PapagoEndpoint: EndpointType {
    
    var baseUrl: String {
        return "https://naveropenapi.apigw.ntruss.com/"
    }
    
    var header: HTTPHeaders? {
        return ["X-NCP-APIGW-API-KEY-ID": "bpfoiha090",
                "X-NCP-APIGW-API-KEY": "KuoIQ8LYjwvBQSIz99Mlcij1Z4QICehNvJp8Wpam"]
    }
    
    var path: String {
        switch self {
        case .detect:
            return "langs/v1/dect"
        case .translate:
            return "nmt/v1/translation"
        }
    }
    
    var method: HTTPMethod {
        return .post
    }
    
    var parameter: [String: Any]? {
        switch self {
        case .detect(let text):
            return ["query": text]
        case .translate(let source, let target, let text):
            return ["source": source,
                    "target": target,
                    "text": text]
        }
    }
    
}
