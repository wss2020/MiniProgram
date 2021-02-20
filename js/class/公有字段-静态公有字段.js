
class ClassWithStaticField {
    static baseStaticField = 'base static field';
    static anotherBaseStaticField = this.baseStaticField;

    static baseStaticMethod() { return 'base static method output'; }
}

class SubClassWithStaticField extends ClassWithStaticField {
    static subStaticField = super.baseStaticMethod();
}

console.log(ClassWithStaticField.anotherBaseStaticField);
// 预期输出值: "base static field"

console.log(SubClassWithStaticField.subStaticField);
// 预期输出值: "base static method output"
