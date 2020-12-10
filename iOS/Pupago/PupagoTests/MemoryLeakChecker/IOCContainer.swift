//
//  IOCContainer.swift
//
//
//  Created by 김종원 on 2020/12/03.
//

import Foundation

/// 초간단 IoC Container - Test용

typealias Build = (Resolver) -> AnyObject

private protocol Builder {
    func build<T: AnyObject>(_ resolver: Resolver) -> T
    init(_ build: @escaping Build)
}

private class DefaultBuilder: Builder {
    let _build: Build
    
    required init(_ build: @escaping Build) {
        _build = build
    }
    
    func build<T: AnyObject>(_ resolver: Resolver) -> T {
        _build(resolver) as! T
    }
}

private typealias Container = [String: Builder]

class Resolver {
    static let shared = Resolver(container: [:])
    
    private var container: Container = [:]
    
    private init(container: Container) {
        self.container = container
    }
    
    private init(name: String, builder: Builder) {
        self.container = [name: builder]
    }
    
    @discardableResult
    func regist<T: AnyObject>(_ build: @escaping (Resolver) -> T) -> Resolver {
        container[String(describing: T.self)] = DefaultBuilder(build)
        return self
    }
    
    func resolve<T: AnyObject>() -> T {
        let name = String(describing: T.self)
        guard let builder = container[name] else {
            fatalError()
        }
        return builder.build(self)
    }
    
    func resolve<T: AnyObject>(_ type: T.Type) -> T {
        resolve()
    }
}

extension Resolver {
    static func empty() -> Resolver {
        Resolver(container: [:])
    }
    
    static func regist<T: AnyObject>(_ build: @escaping (Resolver) -> T) -> Resolver {
        Resolver(container: [String(describing: T.self) : DefaultBuilder(build)])
    }
    
    static func +(lhs: Resolver, rhs: Resolver) -> Resolver {
        var merged: Container = lhs.container
        for (name, builder) in rhs.container {
            merged[name] = builder
        }
        return Resolver(container: merged)
    }

    static func +=(lhs: inout Resolver, rhs: Resolver) -> Resolver {
        lhs = lhs + rhs
        return rhs
    }
}

protocol Resolvable: NSObject {}
extension Resolvable {
    static func resolve(from resolver: Resolver = .shared) -> Self {
        resolver.resolve()
    }
}


extension MemoryLeakCheckable where Self: Resolvable {
    static func instantiateForLeakChecking() -> Self {
        Self.resolve()
    }
}
