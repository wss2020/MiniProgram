/**
 JSX 特定属性
 */

// 你可以通过使用引号，来将属性值指定为字符串字面量：
const element = <div tabIndex="0"></div> ;



// 也可以使用大括号，来在属性值中插入一个 JavaScript 表达式：
const element1 = <img src={user.avatarUrl}></img>;


/**
    在属性中嵌入 JavaScript 表达式时，不要在大括号外面加上引号。你应该仅使用
 引号（对于字符串值）或大括号（对于表达式）中的一个，对于同一属性不能同时使用这两种符号。


 
 警告：
    因为 JSX 语法上更接近 JavaScript 而不是 HTML，所以 React DOM 使用
 camelCase（小驼峰命名）来定义属性的名称，而不使用 HTML 属性名称的命名约定。

    例如，JSX 里的 class 变成了 className，而 tabindex 则变为 tabIndex。
 */
