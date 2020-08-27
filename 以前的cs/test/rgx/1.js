let RegExp = /^\S{1,4}$/ ;




console.log( RegExp.test(1) );
console.log( RegExp.test(21) );
console.log( RegExp.test(123) );
console.log( RegExp.test(1234) );
console.log( RegExp.test('王') );
console.log( RegExp.test('王帅') );
console.log( RegExp.test('王晒晒帅') );
console.log( RegExp.test('王晒晒帅范德萨') );
console.log( RegExp.test('王俄1萨') );
console.log( RegExp.test('王俄12萨') );

console.log( RegExp.test('王晒晒帅') );
console.log( RegExp.test('') );
console.log( RegExp.test(1) );
