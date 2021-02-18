 // 在 Render 中的绑定
class Foo extends Component {
    handleClick() {
        console.log('Click happened');
    }
    render() {
        return <button onClick={this.handleClick.bind(this)}>Click Me</button>;
    }
}

/**
 注意：
   在 render 方法中使用 Function.prototype.bind 会在每次组件渲染时创建一个新的函数，可能会影响性能（参见下文）。
 */
