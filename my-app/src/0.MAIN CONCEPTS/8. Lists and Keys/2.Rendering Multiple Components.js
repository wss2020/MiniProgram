/**
 渲染多个组件

 你可以通过使用 {} 在 JSX 内构建一个元素集合。

 下面，我们使用 Javascript 中的 map() 方法来遍历 numbers 数组。将数组中的每个元素变成 <li> 标签，最后我们将得到的数组赋值给 listItems：
 */

const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
    <li>{number}</li>
);


// 我们把整个 listItems 插入到 <ul> 元素中，然后渲染进 DOM：
ReactDOM.render(
    <ul>{listItems}</ul>,
    document.getElementById('root')
);

// 这段代码生成了一个 1 到 5 的项目符号列表。






