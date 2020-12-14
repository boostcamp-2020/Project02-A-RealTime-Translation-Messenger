//
//  VNDocumentCameraViewController+Rx.swift
//  Pupago
//
//  Created by 김근수 on 2020/12/10.
//

import RxSwift
import RxCocoa
import VisionKit

class RxVNDocumentCameraViewControllerDelegateProxy: 
    DelegateProxy<VNDocumentCameraViewController, VNDocumentCameraViewControllerDelegate>,
    DelegateProxyType,
    VNDocumentCameraViewControllerDelegate {
    
    static func registerKnownImplementations() {
        self.register { (vnDocViewController) -> RxVNDocumentCameraViewControllerDelegateProxy in
            RxVNDocumentCameraViewControllerDelegateProxy(parentObject: vnDocViewController,
                                                          delegateProxy: self)
        }
    }
    
    static func currentDelegate(for object: VNDocumentCameraViewController) -> VNDocumentCameraViewControllerDelegate? {
        return object.delegate
    }
    
    static func setCurrentDelegate(_ delegate: VNDocumentCameraViewControllerDelegate?, to object: VNDocumentCameraViewController) {
        object.delegate = delegate
    }
    
}

extension Reactive where Base: VNDocumentCameraViewController {
    var delegate: DelegateProxy<VNDocumentCameraViewController, VNDocumentCameraViewControllerDelegate> {
        return RxVNDocumentCameraViewControllerDelegateProxy.proxy(for: self.base)
    }
    
    var didFinish: Observable<UIImage> {
        return delegate.methodInvoked(#selector(VNDocumentCameraViewControllerDelegate.documentCameraViewController(_:didFinishWith:)))
            .map { parameters in
                let controller = parameters[0] as? VNDocumentCameraViewController ?? VNDocumentCameraViewController()
                controller.dismiss(animated: true, completion: nil)
                let scan = parameters[1] as? VNDocumentCameraScan
                let image = scan?.imageOfPage(at: 0) ?? UIImage()
                return image
            }
        
    }
}
