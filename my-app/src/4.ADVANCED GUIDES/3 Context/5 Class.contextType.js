
class MyClass extends React.Component {
    componentDidMount() {
        let value = this.context;
        /* 在组件挂载完成后，使用 MyContext 组件的值来执行一些有副作用的操作 */
    }
    componentDidUpdate() {
        let value = this.context;
        /* ... */
    }
    componentWillUnmount() {
        let value = this.context;
        /* ... */
    }
    render() {
        let value = this.context;
        /* 基于 MyContext 组件的值进行渲染 */
    }
}
MyClass.contextType = MyContext;

/**
    挂载在 class 上的 contextType 属性会被重赋值为一个由 React.createContext() 创建的 Context 对象。这能让你使用 this.context 来消费
 最近 Context 上的那个值。你可以在任何生命周期中访问到它，包括 render 函数中。

 注意：
 你只通过该 API 订阅单一 context。如果你想订阅多个，阅读使用多个 Context 章节
 如果你正在使用实验性的 public class fields 语法，你可以使用 static 这个类属性来初始化你的 contextType。
 */

class MyClass extends React.Component {
    static contextType = MyContext;
    render() {
        let value = this.context;
        /* 基于这个值进行渲染工作 */
    }
}

