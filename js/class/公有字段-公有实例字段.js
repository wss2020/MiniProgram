class ClassWithInstanceField1 {
    instanceField = 'instance field';
}

const instance = new ClassWithInstanceField1();
console.log(instance.instanceField);
// 预期输出值: "instance field"





const PREFIX = 'prefix';
class ClassWithComputedFieldName {
    [`${PREFIX}Field`] = 'prefixed field';
}

const instance1 = new ClassWithComputedFieldName();
console.log(instance1.prefixField);
// 预期输出值: "prefixed field"







class ClassWithInstanceField {
    baseInstanceField = 'base field';
    anotherBaseInstanceField = this.baseInstanceField;
    baseInstanceMethod() { return 'base method output'; }
}

class SubClassWithInstanceField extends ClassWithInstanceField {
    subInstanceField = super.baseInstanceMethod();
}

const base = new ClassWithInstanceField();
const sub = new SubClassWithInstanceField();

console.log(base.anotherBaseInstanceField);
// 预期输出值: "base field"

console.log(sub.subInstanceField);
// 预期输出值: "base method output"



