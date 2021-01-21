//Props 的只读性

// 组件无论是使用函数声明还是通过 class 声明，都决不能修改自身的 props。来看下这个 sum 函数：
function sum(a, b) {
    return a + b;
}

// 这样的函数被称为“纯函数”，因为该函数不会尝试更改入参，且多次调用下相同的入参始终返回相同的结果。


// 相反，下面这个函数则不是纯函数，因为它更改了自己的入参：
function withdraw(account, amount) {
    account.total -= amount;
}

/**
 React 非常灵活，但它也有一个严格的规则：

 所有 React 组件都必须像纯函数一样保护它们的 props 不被更改。

 当然，应用程序的 UI 是动态的，并会伴随着时间的推移而变化。在下一章节中，我们将介绍一种新的概念，称之为 “state”。
 在不违反上述规则的情况下，state 允许 React 组件随用户操作、网络响应或者其他变化而动态更改输出内容。
 */



