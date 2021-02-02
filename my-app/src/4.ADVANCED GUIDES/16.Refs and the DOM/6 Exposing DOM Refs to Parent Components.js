/**
 将 DOM Refs 暴露给父组件

    在极少数情况下，你可能希望在父组件中引用子节点的 DOM 节点。通常不建议这样做，因为它会打破组件的封装，但它偶尔可用于触发焦点或测量子 DOM 节点的
 大小或位置。

    虽然你可以向子组件添加 ref，但这不是一个理想的解决方案，因为你只能获取组件实例而不是 DOM 节点。并且，它还在函数组件上无效。

    如果你使用 16.3 或更高版本的 React, 这种情况下我们推荐使用 ref 转发。Ref 转发使组件可以像暴露自己的 ref 一样暴露子组件的 ref。关于怎样对
 父组件暴露子组件的 DOM 节点，在 ref 转发文档中有一个详细的例子。

    如果你使用 16.2 或更低版本的 React，或者你需要比 ref 转发更高的灵活性，你可以使用这个替代方案将 ref 作为特殊名字的 prop 直接传递。

    可能的话，我们不建议暴露 DOM 节点，但有时候它会成为救命稻草。注意这个方案需要你在子组件中增加一些代码。如果你对子组件的实现没有控制权的话，你
 剩下的选择是使用 findDOMNode()，但在严格模式 下已被废弃且不推荐使用。
 */
