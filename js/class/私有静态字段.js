
class BaseClassWithPrivateStaticField {
    static #PRIVATE_STATIC_FIELD

    static basePublicStaticMethod() {
        this.#PRIVATE_STATIC_FIELD = 42
        return this.#PRIVATE_STATIC_FIELD
    }
}

class SubClass extends BaseClassWithPrivateStaticField { }

// 下面这样写，error
console.log( SubClass.basePublicStaticMethod()  )
