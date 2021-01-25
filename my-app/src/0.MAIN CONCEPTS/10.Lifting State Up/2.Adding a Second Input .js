import React from "react";

/**
 我们的新需求是，在已有摄氏温度输入框的基础上，我们提供华氏度的输入框，并保持两个输入框的数据同步。

 我们先从 Calculator 组件中抽离出 TemperatureInput 组件，然后为其添加一个新的 scale prop，它可以是 "c" 或是 "f"：
 */

const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
};

class TemperatureInput extends React.Component {
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
        const scale = this.props.scale;
        return (
            <fieldset>
                <legend>Enter temperature in {scaleNames[scale]}:</legend>
                <input value={temperature}
                       onChange={this.handleChange} />
            </fieldset>
        );
    }
}

// 我们现在可以修改 Calculator 组件让它渲染两个独立的温度输入框组件：
export class Calculator extends React.Component {
    render() {
        return (
            <div>
                <TemperatureInput scale="c" />
                <TemperatureInput scale="f" />
            </div>
        );
    }
}

/**
 我们现在有了两个输入框，但当你在其中一个输入温度时，另一个并不会更新。这与我们的要求相矛盾：我们希望让它们保持同步。

    另外，我们也不能通过 Calculator 组件展示 BoilingVerdict 组件的渲染结果。因为 Calculator 组件并不知道隐藏
 在 TemperatureInput 组件中的当前温度是多少。
 */











