//
//  ImageOCR.swift
//  Pupago
//
//  Created by kimn on 2020/12/10.
//

import Foundation

struct Validation: Codable {
    let result: String?
}

struct Field: Codable {
    let inferText: String?
    let inferConfidence: Double?
}

struct ImageData: Codable {
    let uid: String?
    let name: String?
    let inferResult: String?
    let message: String?
    let validationResult: Validation
    let fields: [Field]
}

struct OCRResponse: Codable {
    let version: String?
    let requestId: String?
    let timestamp: Int?
    let images: [ImageData]
    
    var concatedString: String {
        guard let image = images.first else { return "" }
        return image.fields
            .map { $0.inferText ?? "" }
            .joined(separator: " ")
    }
}
