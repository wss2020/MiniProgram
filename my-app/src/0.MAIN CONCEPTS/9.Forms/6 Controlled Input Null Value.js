/**
 受控输入空值

 在受控组件上指定 value 的 prop 会阻止用户更改输入。如果你指定了 value，但输入仍可编辑，则可能是你意外地将value 设置为 undefined 或 null。

 下面的代码演示了这一点。（输入最初被锁定，但在短时间延迟后变为可编辑。）
 */

ReactDOM.render(<input value="hi" />, mountNode);

setTimeout(function() {
    ReactDOM.render(<input value={null} />, mountNode);
}, 1000);


/**
 * Alternatives to Controlled Components
 受控组件的替代品
    有时使用受控组件会很麻烦，因为你需要为数据变化的每种方式都编写事件处理函数，并通过一个 React 组件传递所有的输入 state。
 当你将之前的代码库转换为 React 或将 React 应用程序与非 React 库集成时，这可能会令人厌烦。在这些情况下，你可能希望使用
 非受控组件, 这是实现输入表单的另一种方式。


 Fully-Fledged Solutions
 成熟的解决方案
    如果你想寻找包含验证、追踪访问字段以及处理表单提交的完整解决方案，使用 Formik 是不错的选择。然而，它也是建立在受控组
 件和管理 state 的基础之上 —— 所以不要忽视学习它们。
 */
