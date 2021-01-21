/**
 用 key 提取组件
 元素的 key 只有放在就近的数组上下文中才有意义。

 比方说，如果你提取出一个 ListItem 组件，你应该把 key 保留在数组中的这个 <ListItem /> 元素上，而不是放在 ListItem 组件中的 <li> 元素上。

 */

// Example: Incorrect Key Usage
// 例子：不正确的使用 key 的方式
function ListItem(props) {
    const value = props.value;
    return (
        // 错误！你不需要在这里指定 key：
        <li key={value.toString()}>
            {value}
        </li>
    );
}

function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
        // 错误！元素的 key 应该在这里指定：

        <ListItem value={number} />
    );
    return (
        <ul>
            {listItems}
        </ul>
    );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
    <NumberList numbers={numbers} />,
    document.getElementById('root')
);
