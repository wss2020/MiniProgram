/**
 将生命周期方法添加到 Class 中

 在具有许多组件的应用程序中，当组件被销毁时释放所占用的资源是非常重要的。

 当 Clock 组件第一次被渲染到 DOM 中的时候，就为其设置一个计时器。这在 React 中被称为“挂载（mount）”。

 同时，当 DOM 中 Clock 组件被删除的时候，应该清除计时器。这在 React 中被称为“卸载（unmount）”。

 我们可以为 class 组件声明一些特殊的方法，当组件挂载或卸载时就会去执行这些方法：

 */

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    componentDidMount() {
    }

    componentWillUnmount() {
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

// 这些方法叫做“生命周期方法”。


// componentDidMount() 方法会在组件已经被渲染到 DOM 中后运行，所以，最好在这里设置计时器
// componentDidMount() {
//     this.timerID = setInterval(
//         () => this.tick(),
//         1000
//     );
// }

/***/

















