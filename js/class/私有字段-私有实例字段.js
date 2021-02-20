class ClassWithPrivateField {
    #privateField;

    constructor() {
        this.#privateField = 42;
        // this.#randomField = 666;   // # Syntax error
    }
}

const instance = new ClassWithPrivateField();
instance.#privateField === 42; // Syntax error



