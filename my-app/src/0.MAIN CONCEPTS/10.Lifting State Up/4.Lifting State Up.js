/**
 到目前为止, 两个 TemperatureInput 组件均在各自内部的 state 中相互独立地保存着各自的数据。

 然而，我们希望两个输入框内的数值彼此能够同步。当我们更新摄氏度输入框内的数值时，华氏度输入框内应当显示转换后的华氏温度，反之亦然。

 在 React 中，将多个组件中需要共享的 state 向上移动到它们的最近共同父组件中，便可实现共享 state。这就是所谓的“状态提升”。
 接下来，我们将 TemperatureInput 组件中的 state 移动至 Calculator 组件中去。

 如果 Calculator 组件拥有了共享的 state，它将成为两个温度输入框中当前温度的“数据源”。它能够使得两个温度输入框的数值彼此
 保持一致。由于两个 TemperatureInput 组件的 props 均来自共同的父组件 Calculator，因此两个输入框中的内容将始终保持一致。

 让我们看看这是如何一步一步实现的。

 首先，我们将 TemperatureInput 组件中的 this.state.temperature 替换为 this.props.temperature。现在，我们先
 假定 this.props.temperature 已经存在，尽管将来我们需要通过 Calculator 组件将其传入：
 handleChange(e) {
            // Before: this.setState({temperature: e.target.value});
            this.props.onTemperatureChange(e.target.value);
            // ...

注意：
    自定义组件中的 temperature 和 onTemperatureChange 这两个 prop 的命名没有任何特殊含义。我们可以给它们取其它任意的名字，
    例如，把它们命名为 value 和 onChange 就是一种习惯。

    onTemperatureChange 的 prop 和 temperature 的 prop 一样，均由父组件 Calculator 提供。它通过修改父组件自身的内部
state 来处理数据的变化，进而使用新的数值重新渲染两个输入框。我们将很快看到修改后的 Calculator 组件效果。

    在深入研究 Calculator 组件的变化之前，让我们回顾一下 TemperatureInput 组件的变化。我们移除组件自身的 state，通过使用
this.props.temperature 替代 this.state.temperature 来读取温度数据。当我们想要响应数据改变时，我们需要调用 Calculator
组件提供的 this.props.onTemperatureChange()，而不再使用 this.setState()。

 */

/**
 现在，让我们把目光转向 Calculator 组件。

 我们会把当前输入的 temperature 和 scale 保存在组件内部的 state 中。这个 state 就是从两个输入框组件中“提升”而来的，并且
 它将用作两个输入框组件的共同“数据源”。这是我们为了渲染两个输入框所需要的所有数据的最小表示。

 例如，当我们在摄氏度输入框中键入 37 时，Calculator 组件中的 state 将会是：
 {
          temperature: '37',
          scale: 'c'
        }

 如果我们之后修改华氏度的输入框中的内容为 212 时，Calculator 组件中的 state 将会是：
 {
          temperature: '212',
          scale: 'f'
        }

 我们可以存储两个输入框中的值，但这并不是必要的。我们只需要存储最近修改的温度及其计量单位即可，根据当前的 temperature 和 scale
 就可以计算出另一个输入框的值。

 由于两个输入框中的数值由同一个 state 计算而来，因此它们始终保持同步：
 */


import React from "react";

const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
};

function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

function BoilingVerdict(props) {
    if (props.celsius >= 100) {
        return <p>The water would boil.</p>;
    }
    return <p>The water would not boil.</p>;
}

class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onTemperatureChange(e.target.value);
    }

    render() {
        const temperature = this.props.temperature;
        const scale = this.props.scale;
        return (
            <fieldset>
                <legend>Enter temperature in {scaleNames[scale]}:</legend>
                <input value={temperature}
                       onChange={this.handleChange}/>
            </fieldset>
        );
    }
}

export class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
        this.state = {temperature: '', scale: 'c'};
    }

    handleCelsiusChange(temperature) {
        this.setState({scale: 'c', temperature});
    }

    handleFahrenheitChange(temperature) {
        this.setState({scale: 'f', temperature});
    }

    render() {
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
        const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

        return (
            <div>
                <TemperatureInput
                    scale="c"
                    temperature={celsius}
                    onTemperatureChange={this.handleCelsiusChange}/>
                <TemperatureInput
                    scale="f"
                    temperature={fahrenheit}
                    onTemperatureChange={this.handleFahrenheitChange}/>
                <BoilingVerdict
                    celsius={parseFloat(celsius)}/>
            </div>
        );
    }
}



/**
 现在无论你编辑哪个输入框中的内容，Calculator 组件中的 this.state.temperature 和 this.state.scale 均会被更新。
 其中一个输入框保留用户的输入并取值，另一个输入框始终基于这个值显示转换后的结果。

 让我们来重新梳理一下当你对输入框内容进行编辑时会发生些什么：

    React 会调用 DOM 中 <input> 的 onChange 方法。在本实例中，它是 TemperatureInput 组件的 handleChange 方法。

    TemperatureInput 组件中的 handleChange 方法会调用 this.props.onTemperatureChange()，并传入新输入的值作为参数。
 其 props 诸如 onTemperatureChange 之类，均由父组件 Calculator 提供。

    起初渲染时，用于摄氏度输入的子组件 TemperatureInput 中的 onTemperatureChange 方法与 Calculator 组件中的 handleCelsiusChange
 方法相同，而，用于华氏度输入的子组件 TemperatureInput 中的 onTemperatureChange 方法与 Calculator 组件中的 handleFahrenheitChange
 方法相同。因此，无论哪个输入框被编辑都会调用 Calculator 组件中对应的方法。

    在这些方法内部，Calculator 组件通过使用新的输入值与当前输入框对应的温度计量单位来调用 this.setState() 进而请求 React 重新渲染自己本身。

    React 调用 Calculator 组件的 render 方法得到组件的 UI 呈现。温度转换在这时进行，两个输入框中的数值通过当前输入温度和其计量单位来重
 新计算获得。

    React 使用 Calculator 组件提供的新 props 分别调用两个 TemperatureInput 子组件的 render 方法来获取子组件的 UI 呈现。

    React 调用 BoilingVerdict 组件的 render 方法，并将摄氏温度值以组件 props 方式传入。

    React DOM 根据输入值匹配水是否沸腾，并将结果更新至 DOM。我们刚刚编辑的输入框接收其当前值，另一个输入框内容更新为转换后的温度值。
 
    得益于每次的更新都经历相同的步骤，两个输入框的内容才能始终保持同步。
 */

















