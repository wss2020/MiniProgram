/**
 受控输入空值

 在受控组件上指定 value 的 prop 会阻止用户更改输入。如果你指定了 value，但输入仍可编辑，则可能是你意外地将value 设置为 undefined 或 null。

 下面的代码演示了这一点。（输入最初被锁定，但在短时间延迟后变为可编辑。）
 */

ReactDOM.render(<input value="hi" />, mountNode);

setTimeout(function() {
    ReactDOM.render(<input value={null} />, mountNode);
}, 1000);


