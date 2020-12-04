//
//  ParticipantViewModel.swift
//  Pupago
//
//  Created by 김근수 on 2020/12/05.
//

import Foundation

class ParticipantViewModel: ViewModel, ViewModelType {
    
    struct Input {}
    struct Output {}
    
    func transform(_ input: Input) -> Output {
        return Output()
    }
    
}
