//class 属性（第三阶段提案）

class Foo extends Component {
    // Note: this syntax is experimental and not standardized yet.
    handleClick = () => {
        console.log('Click happened');
    }
    render() {
        return <button onClick={this.handleClick}>Click Me</button>;
    }
}
