
// 之前，我们遇到的 React 元素都只是 DOM 标签：
const element = <div />;

// 不过，React 元素也可以是用户自定义的组件：
const element1 = <Welcome name="Sara" />;


/**
    当 React 元素为用户自定义组件时，它会将 JSX 所接收的属性（attributes）
 以及子组件（children）转换为单个对象传递给组件，这个对象被称之为 “props”。
 */


// 例如，这段代码会在页面上渲染 “Hello, Sara”：
function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
    element,
    document.getElementById('root')
);

/**
 让我们来回顾一下这个例子中发生了什么：

     1.我们调用 ReactDOM.render() 函数，并传入 <Welcome name="Sara" /> 作为参数。
     2.React 调用 Welcome 组件，并将 {name: 'Sara'} 作为 props 传入。
     3.Welcome 组件将 <h1>Hello, Sara</h1> 元素作为返回值。
     4.React DOM 将 DOM 高效地更新为 <h1>Hello, Sara</h1>。


 注意： 组件名称必须以大写字母开头。

    React 会将以小写字母开头的组件视为原生 DOM 标签。例如，<div /> 代表 HTML 的 div 标签，
 而 <Welcome /> 则代表一个组件，并且需在作用域内使用 Welcome。

    你可以在深入 JSX 中了解更多关于此规范的原因。
 */











