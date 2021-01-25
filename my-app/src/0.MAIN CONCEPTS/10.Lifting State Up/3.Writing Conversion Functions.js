// 编写转换函数

// 首先，我们将编写两个可以在摄氏度与华氏度之间相互转换的函数：
function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}


/**
    上述两个函数仅做数值转换。而我们将编写另一个函数，它接受字符串类型的 temperature 和转换函数作为
 参数并返回一个字符串。我们将使用它来依据一个输入框的值计算出另一个输入框的值。

    当输入 temperature 的值无效时，函数返回空字符串，反之，则返回保留三位小数并四舍五入后的转换结果：
 */
function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

// 例如，tryConvert('abc', toCelsius) 返回一个空字符串，
// 而 tryConvert('10.22', toFahrenheit) 返回 '50.396'。


























