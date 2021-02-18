<MyContext.Consumer>
    {value => /* 基于 context 值进行渲染*/}
</MyContext.Consumer>


/**
 一个 React 组件可以订阅 context 的变更，这让你在函数式组件中可以订阅 context。

    这种方法需要一个函数作为子元素（function as a child）。这个函数接收当前的 context 值，并返回一个 React 节点。传递给函数的 value 值等价
 于组件树上方离这个 context 最近的 Provider 提供的 value 值。如果没有对应的 Provider，value 参数等同于传递给 createContext() 的
 defaultValue。

 注意
 想要了解更多关于 “函数作为子元素（function as a child）” 模式，详见 render props。
 */

