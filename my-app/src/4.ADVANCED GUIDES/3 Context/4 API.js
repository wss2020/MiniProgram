import React from "react";

const MyContext = React.createContext(defaultValue);
/**
    React.createContext

    创建一个 Context 对象。当 React 渲染一个订阅了这个 Context 对象的组件，这个组件会从组件树中离自身最近的那个匹配的 Provider 中读取到当前
的 context 值。

    只有当组件所处的树中没有匹配到 Provider 时，其 defaultValue 参数才会生效。这有助于在不使用 Provider 包装组件的情况下对组件进行测试。
 注意：将 undefined 传递给 Provider 的 value 时，消费组件的 defaultValue 不会生效

 */




<MyContext.Provider value={/* 某个值 */} >  </MyContext.Provider>
/**
 Context.Provider

    每个 Context 对象都会返回一个 Provider React 组件，它允许消费组件订阅 context 的变化。
    Provider 接收一个 value 属性，传递给消费组件。一个 Provider 可以和多个消费组件有对应关系。多个 Provider 也可以嵌套使用，里层的会覆盖外层的
 数据。
    当 Provider 的 value 值发生变化时，它内部的所有消费组件都会重新渲染。Provider 及其内部 consumer 组件都不受制于 shouldComponentUpdate
 函数，因此当 consumer 组件在其祖先组件退出更新的情况下也能更新。
    通过新旧值检测来确定变化，使用了与 Object.is 相同的算法。

 注意：
 当传递对象给 value 时，检测变化的方式会导致一些问题：详见注意事项。
 https://reactjs.bootcss.com/docs/context.html#caveats
 */
