/**
 通过以下五步将 Clock 的函数组件转成 class 组件：

 1.创建一个同名的 ES6 class，并且继承于 React.Component。
 2.添加一个空的 render() 方法。
 3.将函数体移动到 render() 方法之中。
 4.在 render() 方法中使用 this.props 替换 props。
 5.删除剩余的空函数声明。

 */

class Clock extends React.Component {
    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}

function tick() {
    ReactDOM.render(
        <Clock date={new Date()} />,
        document.getElementById('root')
    );
}

setInterval(tick, 1000);



/**
 现在 Clock 组件被定义为 class，而不是函数。

 每次组件更新时 render 方法都会被调用，但只要在相同的 DOM 节点中渲染 <Clock /> ，
 就仅有一个 Clock 组件的 class 实例被创建使用。这就使得我们可以使用如 state 或生命周期方法等很多其他特性。

 */





















