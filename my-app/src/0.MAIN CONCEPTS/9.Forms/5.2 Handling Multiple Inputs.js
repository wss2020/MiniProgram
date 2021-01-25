/**
    当需要处理多个 input 元素时，我们可以给每个元素添加 name 属性，并让处理函数根据 event.target.name 的值选择要执行的操作。

 例如：
 */
import React from "react";
export class Reservation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isGoing: true,
            numberOfGuests: 2
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <form>
                <label>
                    参与:
                    <input
                        name="isGoing"
                        type="checkbox"
                        checked={this.state.isGoing}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                    来宾人数:
                    <input
                        name="numberOfGuests"
                        type="number"
                        value={this.state.numberOfGuests}
                        onChange={this.handleInputChange} />
                </label>
            </form>
        );
    }
}

// 这里使用了 ES6 计算属性名称的语法更新给定输入名称对应的 state 值：
// 例如：
this.setState({
    [name]: value
});

// 等同 ES5:
var partialState = {};
partialState[name] = value;
this.setState(partialState);

// 另外，由于 setState() 自动将部分 state 合并到当前 state, 只需调用它更改部分 state 即可。


