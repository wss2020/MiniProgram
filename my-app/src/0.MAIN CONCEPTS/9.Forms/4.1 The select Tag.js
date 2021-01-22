// select 标签

// 在 HTML 中，<select> 创建下拉列表标签。例如，如下 HTML 创建了水果相关的下拉列表：
// <select>
//     <option value="grapefruit">葡萄柚</option>
//     <option value="lime">酸橙</option>
//     <option selected value="coconut">椰子</option>
//     <option value="mango">芒果</option>
// </select>


/**
    请注意，由于 selected 属性的缘故，椰子选项默认被选中。React 并不会使用 selected 属性，而是在根 select 标签上使用 value 属性。
 这在受控组件中更便捷，因为您只需要在根标签中更新它。例如：
 */

class FlavorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: 'coconut'};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('你喜欢的风味是: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    选择你喜欢的风味:
                    <select value={this.state.value} onChange={this.handleChange}>
                        <option value="grapefruit">葡萄柚</option>
                        <option value="lime">酸橙</option>
                        <option value="coconut">椰子</option>
                        <option value="mango">芒果</option>
                    </select>
                </label>
                <input type="submit" value="提交" />
            </form>
        );
    }
}


/**
    总的来说，这使得 <input type="text">, <textarea> 和 <select> 之类的标签都非常相似—它们都接受一个 value 属性，
 你可以使用它来实现受控组件。


 注意
 你可以将数组传递到 value 属性中，以支持在 select 标签中选择多个选项：
    <select multiple={true} value={['B', 'C']}>。
 */


























