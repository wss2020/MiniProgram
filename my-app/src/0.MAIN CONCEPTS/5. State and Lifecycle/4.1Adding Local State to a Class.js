/**
 向 class 组件中添加局部的 state

 我们通过以下三步将 date 从 props 移动到 state 中：

 */
// 1.把 render() 方法中的 this.props.date 替换成 this.state.date ：
class Clock extends React.Component {
    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}


// 2.添加一个 class 构造函数，然后在该函数中为 this.state 赋初值：
class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}

// 通过以下方式将 props 传递到父类的构造函数中：
// constructor(props) {
//     super(props);
//     this.state = {date: new Date()};
// }

// Class 组件应该始终使用 props 参数来调用父类的构造函数。


// 移除 <Clock /> 元素中的 date 属性：
ReactDOM.render(
    <Clock />,
    document.getElementById('root')
);

// 我们之后会将计时器相关的代码添加到组件中。

// 代码在 4.1

// 接下来，我们会设置 Clock 的计时器并每秒更新它。



