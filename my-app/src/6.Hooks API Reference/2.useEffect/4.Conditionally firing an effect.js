/**
 effect 的条件执行

 默认情况下，effect 会在每轮组件渲染完成后执行。这样的话，一旦 effect 的依赖发生变化，它就会被重新创建。

 然而，在某些场景下这么做可能会矫枉过正。比如，在上一章节的订阅示例中，我们不需要在每次组件更新时都创建新的订阅，
 而是仅需要在 source prop 改变时重新创建。

 要实现这一点，可以给 useEffect 传递第二个参数，它是 effect 所依赖的值数组。更新后的示例如下：
 */

useEffect(
    () => {
        const subscription = props.source.subscribe();
        return () => {
            subscription.unsubscribe();
        };
    },
    [props.source],
);

/**
 此时，只有当 props.source 改变后才会重新创建订阅。

 注意

 如果你要使用此优化方式，请确保数组中包含了所有外部作用域中会发生变化且在 effect 中使用的变量，否则你的代码会引用到先前渲染中的旧变量。
 请参阅文档，了解更多关于如何处理函数 以及数组频繁变化时的措施 的内容。

 如果想执行只运行一次的 effect（仅在组件挂载和卸载时执行），可以传递一个空数组（[]）作为第二个参数。这就告诉 React 你的 effect 不依赖于
 props 或 state 中的任何值，所以它永远都不需要重复执行。这并不属于特殊情况 —— 它依然遵循输入数组的工作方式。

 如果你传入了一个空数组（[]），effect 内部的 props 和 state 就会一直持有其初始值。尽管传入 [] 作为第二个参数有点类似于
 componentDidMount 和 componentWillUnmount 的思维模式，但我们有 更好的 方式 来避免过于频繁的重复调用 effect。除此之外，
 请记得 React 会等待浏览器完成画面渲染之后才会延迟调用 useEffect，因此会使得处理额外操作很方便。

 我们推荐启用 eslint-plugin-react-hooks 中的 exhaustive-deps 规则。此规则会在添加错误依赖时发出警告并给出修复建议。


 依赖项数组不会作为参数传给 effect 函数。虽然从概念上来说它表现为：所有 effect 函数中引用的值都应该出现在依赖项数组中。
 未来编译器会更加智能，届时自动创建数组将成为可能。
 */




