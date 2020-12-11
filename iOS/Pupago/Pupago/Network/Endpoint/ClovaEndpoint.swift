//
//  CloverEndpoint.swift
//  Pupago
//
//  Created by kimn on 2020/12/10.
//

import Alamofire

enum ClovaEndpoint {
    case detect(data: String, timestamp: Int, requestId: String)
}

extension ClovaEndpoint: EndpointType {
    
    var baseUrl: String {
        return "https://22695ed2ba1649d999f4bcf440ebaa13.apigw.ntruss.com/custom/v1/5627/22e7446bad2431a0b9bee663f0f3bb19d24f07ae1a00e05fc46b4a4b68e0b65b/"
    }
    
    var header: HTTPHeaders? {
        return ["Content-Type": "application/json",
                "X-OCR-SECRET": "dHVUeXVEekh4V3hDQUtERUVMSkVYWG9DcXp2RHlkano="]
    }
    
    var path: String {
        switch self {
        case .detect:
            return "general"
        }
    }
    
    var method: HTTPMethod {
        return .post
    }
        
    var parameter: [String: Any]? {
        switch self {
        case .detect(let data, let timestamp, let requestId):
            return ["version": "V1", "requestId": requestId, "timestamp": timestamp, "images": [["format": "png", "name": "pupago", "data": data]]]
        }
    }
        
}
