//textarea 标签

// 在 HTML 中, <textarea> 元素通过其子元素定义其文本:
/*<textarea>
  你好， 这是在 text area 里的文本
</textarea>*/


// 而在 React 中，<textarea> 使用 value 属性代替。这样，可以使得使用 <textarea> 的表单和使用单行 input 的表单非常类似：
class EssayForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '请撰写一篇关于你喜欢的 DOM 元素的文章.'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('提交的文章: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    文章:
                    <textarea value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="提交" />
            </form>
        );
    }
}

// 请注意，this.state.value 初始化于构造函数中，因此文本区域默认有初值。




































