/**
 Embedding Expressions in JSX
 在 JSX 中嵌入表达式

 在下面的例子中，我们声明了一个名为 name 的变量，然后在 JSX 中使用它，并将它包裹在大括号中：
 */

const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;

ReactDOM.render(
    element,
    document.getElementById('root')
);



/**
    在 JSX 语法中，你可以在大括号内放置任何有效的 JavaScript 表达式。
 例如，2 + 2，user.firstName 或 formatName(user) 都是有效的 JavaScript 表达式。

 在下面的示例中，我们将调用 JavaScript 函数 formatName(user) 的结果，并将结果嵌入到 <h1> 元素中。
 */


function formatName(user) {
    return user.firstName + ' ' + user.lastName;
}

const user = {
    firstName: 'Harper',
    lastName: 'Perez'
};

const element = (
    <h1>
        Hello, {formatName(user)}!
    </h1>
);

ReactDOM.render(
    element,
    document.getElementById('root')
);

/**
    为了便于阅读，我们会将 JSX 拆分为多行。同时，我们建议将内容包裹在括号中，
 虽然这样做不是强制要求的，但是这可以避免遇到自动插入分号陷阱。
 */























