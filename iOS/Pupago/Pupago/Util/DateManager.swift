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
        let outputFormatter = RelativeDateTimeFormatter()
        var outputDate: String = ""
        
        inputFormatter.dateFormat = "yyyy-MM-dd HH:mm:ss"
        outputFormatter.unitsStyle = .full
        outputFormatter.dateTimeStyle = .numeric
        outputFormatter.locale = Application.shared.localize.toLocale
        
        if let date = inputFormatter.date(from: dueDate) {
            outputDate = outputFormatter.localizedString(for: date, relativeTo: Date())
        }
        
        return outputDate
    }
    
    public static func currentTimeMillis() -> Int {
        return Int(Date().timeIntervalSince1970 * 1000)
    }
    
}
