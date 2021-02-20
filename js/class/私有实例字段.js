class ClassWithPrivateField {
    #privateField
    #randomField

    constructor() {
        this.#privateField = 42
        this.#randomField = 666 // Syntax error
    }

    setPrivateField(value){
        this.#privateField = value
    }
    getPrivateField(){
        return this.#privateField;
    }
}

const instance = new ClassWithPrivateField()
instance.setPrivateField(88);
console.log( instance.getPrivateField() );
