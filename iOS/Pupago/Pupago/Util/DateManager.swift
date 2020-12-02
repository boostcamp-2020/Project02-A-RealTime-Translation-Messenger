//
//  DateManager.swift
//  Pupago
//
//  Created by kimn on 2020/12/02.
//

import Foundation

final class DateManager {
    
    public static func stringFormat(of dueDate: String) -> String {
        
        let inputFormatter = DateFormatter()
        let outputFormatter = DateFormatter()
        var outputDate: String = ""
        
        inputFormatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSZ"
            
        if let date = inputFormatter.date(from: dueDate) {
            outputFormatter.dateFormat = "h:mm a"
            outputDate = outputFormatter.string(from: date)
        }
        
        return outputDate
        
    }
    
    public static func dateFormat(of dueDate: Date) -> String {
        let outputFormatter = DateFormatter()
        outputFormatter.dateFormat = "h:mm a"
        
        return outputFormatter.string(from: dueDate)
    }
    
}
