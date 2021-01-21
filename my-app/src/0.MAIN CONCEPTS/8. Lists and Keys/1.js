/**
 列表 & Key
 首先，让我们看下在 Javascript 中如何转化列表。

 如下代码，我们使用 map() 函数让数组中的每一项变双倍，然后我们得到了一个新的列表 doubled 并打印出来：
 */
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
console.log(numbers);
console.log(doubled);

//代码打印出 [2, 4, 6, 8, 10]。

// 在 React 中，把数组转化为元素列表的过程是相似的。
