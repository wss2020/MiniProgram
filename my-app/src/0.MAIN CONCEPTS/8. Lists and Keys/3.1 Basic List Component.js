/**
 基础列表组件

 通常你需要在一个组件中渲染列表。

 我们可以把前面的例子重构成一个组件，这个组件接收 numbers 数组作为参数并输出一个元素列表。
 */
function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
        <li>{number}</li>
    );
    return (
        <ul>{listItems}</ul>
    );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
    <NumberList numbers={numbers} />,
    document.getElementById('root')
);

/**
    当我们运行这段代码，将会看到一个警告 a key should be provided for list items，意思是当你创建一个元素时，
 必须包括一个特殊的 key 属性。我们将在下一节讨论这是为什么。

    让我们来给每个列表元素分配一个 key 属性来解决上面的那个警告： 3.2
 */
