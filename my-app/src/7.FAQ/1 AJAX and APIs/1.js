/**
 如何在 React 中发起 AJAX 请求？
    在 React 开发中，你能使用任何你喜欢的 AJAX 库，比如社区比较流行的 Axios，jQuery AJAX，或者是浏览器内置的 window.fetch。


 应该在 React 组件的哪个生命周期函数中发起 AJAX 请求？
    我们推荐你在 componentDidMount 这个生命周期函数中发起 AJAX 请求。这样做你可以拿到 AJAX 请求返回的数据并通过 setState 来更新组件。



 示例：使用 AJAX 请求结果去改变组件内部 state
 下面这个组件演示了如何在 componentDidMount 中发起 AJAX 请求去更新组件的 state 。

 示例 API 返回如下的 JSON 对象：
 */
