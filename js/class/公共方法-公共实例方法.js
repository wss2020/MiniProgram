class ClassWithPublicInstanceMethod {
    publicMethod() {
        return 'hello world';
    }
}

const instance = new ClassWithPublicInstanceMethod();
console.log(instance.publicMethod());
// 预期输出值: "hello world"




class ClassWithFancyMethods {
    *generatorMethod() { }
    async asyncMethod() { }
    async *asyncGeneratorMethod() { }
}





class BaseClass {
    msg = 'hello world';
    basePublicMethod() {
        return this.msg;
    }
}

class SubClass extends BaseClass {
    subPublicMethod() {
        return super.basePublicMethod();
    }
}

const instance1 = new SubClass();
console.log(instance1.subPublicMethod());
// 预期输出值: "hello world"






class ClassWithGetSet {
    #msg = 'hello world';
    get msg() {
        return this.#msg;
    }
    set msg(x) {
        this.#msg = `hello ${x}`;
    }
}

const instance2 = new ClassWithGetSet();
console.log(instance2.msg);
// expected output: "hello world"

instance2.msg = 'cake';
console.log(instance2.msg);
// 预期输出值: "hello cake"
