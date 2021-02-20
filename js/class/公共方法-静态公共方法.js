class ClassWithStaticMethod {

    static staticProperty = 'someValue';
    static staticMethod() {
        return 'static method has been called.';
    }

}

console.log(ClassWithStaticMethod.staticProperty);
// output: "someValue"
console.log(ClassWithStaticMethod.staticMethod());
// output: "static method has been called."

// 静态方法是在类的赋值阶段用Object.defineProperty方法添加到类中的。静态方法是可编辑的、不可遍历的和可配置的。
