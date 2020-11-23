//
//  ViewController.swift
//  Pupago
//
//  Created by 김근수 on 2020/11/19.
//

import UIKit
import RxSwift
import RxCocoa

class LanguageViewController: UIViewController {
    @IBOutlet weak var introLabel: UILabel!
    @IBOutlet weak var descriptionLabel: UILabel!
    @IBOutlet weak var engButton: SelectableButton!
    @IBOutlet weak var korButton: SelectableButton!
    @IBOutlet weak var nextButton: Button!
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
}
