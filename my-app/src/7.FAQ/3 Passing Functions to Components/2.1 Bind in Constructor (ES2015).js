// 在构造函数中绑定（ES2015）
class Foo extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        console.log('Click happened');
    }
    render() {
        return <button onClick={this.handleClick}>Click Me</button>;
    }
}
