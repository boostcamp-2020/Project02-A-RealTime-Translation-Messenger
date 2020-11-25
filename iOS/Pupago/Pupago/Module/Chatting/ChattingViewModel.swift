//
//  ChattingViewModel.swift
//  Pupago
//
//  Created by 김근수 on 2020/11/25.
//

import Foundation

class ChattingViewModel: ViewModel, ViewModelType {
    
    struct Input {}
    struct Output {}
    
    func transform(_ input: Input) -> Output {
        return Output()
    }
    
}
