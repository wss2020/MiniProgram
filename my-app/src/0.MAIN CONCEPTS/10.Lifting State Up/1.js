/**
状态提升

    通常，多个组件需要反映相同的变化数据，这时我们建议将共享状态提升到最近的共同父组件中去。让我们看看它是如何运作的。

    在本节中，我们将创建一个用于计算水在给定温度下是否会沸腾的温度计算器。

    我们将从一个名为 BoilingVerdict 的组件开始，它接受 celsius 温度作为一个 prop，并据此打印出该温度是否足以将水煮沸的结果。
 */
import React from "react";
function BoilingVerdict(props) {
    if (props.celsius >= 100) {
        return <p>The water would boil.</p>;
    }
    return <p>The water would not boil.</p>;
}

/**
 接下来, 我们创建一个名为 Calculator 的组件。它渲染一个用于输入温度的 <input>，并将其值保存在 this.state.temperature 中。

 另外, 它根据当前输入值渲染 BoilingVerdict 组件。
 */
export class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {temperature: ''};
    }

    handleChange(e) {
        this.setState({temperature: e.target.value});
    }

    render() {
        const temperature = this.state.temperature;
        return (
            <fieldset>
                <legend>Enter temperature in Celsius:</legend>
                <input
                    value={temperature}
                    onChange={this.handleChange} />
                <BoilingVerdict
                    celsius={parseFloat(temperature)} />
            </fieldset>
        );
    }
}

















