// JSX 表示对象

// Babel 会把 JSX 转译成一个名为 React.createElement() 函数调用。
// 以下两种示例代码完全等效

const element = (
    <h1 className="greeting">
        Hello, world!
    </h1>
);


const element1 = React.createElement(
    'h1',
    {className: 'greeting'},
    'Hello, world!'
);


/**
 React.createElement() 会预先执行一些检查，以帮助你编写无错代码，但实际上它创建了一个这样的对象：

注意：这是简化过的结构
 const element = {
    type: 'h1',
    props: {
        className: 'greeting',
        children: 'Hello, world!'
    }
};


这些对象被称为 “React 元素”。它们描述了你希望在屏幕上看到的内容。React 通过读取这些对象，然后使用它们来构建 DOM 以及保持随时更新。


 提示：
 我们推荐在你使用的编辑器中，使用 “Babel” 提供的语言定义，来正确地高亮显示 ES6 和 JSX 代码
 */




