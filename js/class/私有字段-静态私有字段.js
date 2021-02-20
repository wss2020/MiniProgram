class ClassWithPrivateStaticField {
    static #PRIVATE_STATIC_FIELD;

    static publicStaticMethod() {
        ClassWithPrivateStaticField.#PRIVATE_STATIC_FIELD = 42;
        return ClassWithPrivateStaticField.#PRIVATE_STATIC_FIELD;
    }
}

console.log(ClassWithPrivateStaticField.publicStaticMethod() === 42);




class BaseClassWithPrivateStaticField {
    static #PRIVATE_STATIC_FIELD;

    static basePublicStaticMethod() {
        this.#PRIVATE_STATIC_FIELD = 42;
        return this.#PRIVATE_STATIC_FIELD;
    }
}

class SubClass extends BaseClassWithPrivateStaticField { }

console.log( SubClass.basePublicStaticMethod() );
