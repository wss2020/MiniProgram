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

/**
 接下来把计时器的 ID 保存在 this 之中（this.timerID）。

 尽管 this.props 和 this.state 是 React 本身设置的，且都拥有特殊的含义，
 但是其实你可以向 class 中随意添加不参与数据流（比如计时器 ID）的额外字段。

 我们会在 componentWillUnmount() 生命周期方法中清除计时器：
  componentWillUnmount() {
      clearInterval(this.timerID);
  }

 最后，我们会实现一个叫 tick() 的方法，Clock 组件每秒都会调用它。

 使用 this.setState() 来时刻更新组件 state：  代码在5.1


 现在时钟每秒都会刷新。

 让我们来快速概括一下发生了什么和这些方法的调用顺序：

 1.当 <Clock /> 被传给 ReactDOM.render()的时候，React 会调用 Clock 组件的构造函数。因为 Clock 需要显示当前的时间，
 所以它会用一个包含当前时间的对象来初始化 this.state。我们会在之后更新 state。

 2.之后 React 会调用组件的 render() 方法。这就是 React 确定该在页面上展示什么的方式。然后 React 更新 DOM 来匹配 Clock 渲染的输出。

 3.当 Clock 的输出被插入到 DOM 中后，React 就会调用 ComponentDidMount() 生命周期方法。在这个方法中，Clock 组件向浏览器请求设置一
 个计时器来每秒调用一次组件的 tick() 方法。

 4.浏览器每秒都会调用一次 tick() 方法。 在这方法之中，Clock 组件会通过调用 setState() 来计划进行一次 UI 更新。得益于 setState() 的调用，
 React 能够知道 state 已经改变了，然后会重新调用 render() 方法来确定页面上该显示什么。这一次，render() 方法中的 this.state.date 就不一
 样了，如此以来就会渲染输出更新过的时间。React 也会相应的更新 DOM。

 5.一旦 Clock 组件从 DOM 中被移除，React 就会调用 componentWillUnmount() 生命周期方法，这样计时器就停止了。
 */





















