//
//  SpeechManager.swift
//  Pupago
//
//  Created by kimn on 2020/12/06.
//

import Foundation
import RxSwift
import Speech

final class SpeechManager: NSObject {
    
    private let audioEngine = AVAudioEngine()
    private let speechRecognizer = SFSpeechRecognizer(locale: Application.shared.localize.toLocale)
    private var recognitionRequest: SFSpeechAudioBufferRecognitionRequest?
    private var recognitionTask: SFSpeechRecognitionTask?
    
    let recognizedSpeech = BehaviorSubject<String>(value: "")
    
    override init() {
        super.init()
        speechRecognizer?.delegate = self
    }
    
    func speechToText() {
        guard audioEngine.isRunning else {
            self.recoding()
            return
        }
        
        audioEngine.stop()
        recognitionRequest?.endAudio()
        playBackSound(status: false)
    }
    
    private func recoding() {
        if recognitionTask != nil {
            recognitionTask?.cancel()
            recognitionTask = nil
        }
        
        configureAVAudioSession()
        configureRecognition()
    }
    
    private func configureAVAudioSession() {
        let audioSession = AVAudioSession.sharedInstance()
        
        playBackSound(status: true)
        usleep(400000)
        
        do {
            try audioSession.setCategory(AVAudioSession.Category.record)
            try audioSession.setMode(AVAudioSession.Mode.measurement)
            try audioSession.setActive(true, options: .notifyOthersOnDeactivation)
        } catch {
            print(error.localizedDescription)
        }
    }
    
    private func configureRecognition() {
        let inputNode = audioEngine.inputNode
        recognitionRequest = SFSpeechAudioBufferRecognitionRequest()
        
        guard let recognitionRequest = recognitionRequest else {
            fatalError("Unable to Create an SFSpeechAudioBufferRecognitionRequest object")
        }
        
        recognitionRequest.shouldReportPartialResults = true
        configureTask(by: recognitionRequest, on: inputNode)
    }
    
    private func configureTask(by request: SFSpeechAudioBufferRecognitionRequest, on inputNode: AVAudioInputNode) {
        recognitionTask = speechRecognizer?.recognitionTask(with: request, resultHandler: { [weak self] (result, error) in
            var isFinal = false
            
            if let result = result {
                self?.recognizedSpeech.onNext(result.bestTranscription.formattedString)
                isFinal = result.isFinal
            }
            
            guard error != nil || isFinal else { return }
            self?.audioEngine.stop()
            inputNode.removeTap(onBus: .zero)
            
            self?.recognitionRequest = nil
            self?.recognitionTask = nil
        })
        configureSpeechInput(on: inputNode)
    }
    
    private func configureSpeechInput(on inputNode: AVAudioInputNode) {
        let recordingFormat = inputNode.outputFormat(forBus: 0)
        
        inputNode.installTap(onBus: 0, bufferSize: 1024, format: recordingFormat) { (buffer, _) in
            self.recognitionRequest?.append(buffer)
        }
        
        audioEngine.prepare()
        do {
            try audioEngine.start()
        } catch {
            print("audioEngine couldn't start because of an error.")
        }
    }
}

extension SpeechManager: SFSpeechRecognizerDelegate {
    
    private func playBackSound(status: Bool) {
        let audioSession = AVAudioSession.sharedInstance()
        
        do {
            try audioSession.setCategory(AVAudioSession.Category.playback)
            try audioSession.setMode(AVAudioSession.Mode.default)
            try audioSession.setActive(true, options: .notifyOthersOnDeactivation)
        } catch let error as NSError {
            print(error)
        }
         
        let sound: SystemSoundID = status ? 1110 : 1112
        AudioServicesPlaySystemSoundWithCompletion(sound) { }
    }
    
}
