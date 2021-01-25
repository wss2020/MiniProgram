/**
 第二步：用 React 创建一个静态版本

    现在我们已经确定了组件层级，可以编写对应的应用了。最容易的方式，是先用已有的数据模型渲染一个不包含交互功能的 UI。
 最好将渲染 UI 和添加交互这两个过程分开。这是因为，编写一个应用的静态版本时，往往要编写大量代码，而不需要考虑太多交
 互细节；添加交互功能时则要考虑大量细节，而不需要编写太多代码。所以，将这两个过程分开进行更为合适。

 我们会在接下来的代码中体会到其中的区别。

    在构建应用的静态版本时，我们需要创建一些会重用其他组件的组件，然后通过 props 传入所需的数据。props 是父组件向
 子组件传递数据的方式。即使你已经熟悉了 state 的概念，也完全不应该使用 state 构建静态版本。state 代表了随时间会
 产生变化的数据，应当仅在实现交互时使用。所以构建应用的静态版本时，你不会用到它。

    你可以自上而下或者自下而上构建应用：自上而下意味着首先编写层级较高的组件（比如 FilterableProductTable），
 自下而上意味着从最基本的组件开始编写（比如 ProductRow）。当你的应用比较简单时，使用自上而下的方式更方便；对于
 较为大型的项目来说，自下而上地构建，并同时为低层组件编写测试是更加简单的方式。

    到此为止，你应该已经有了一个可重用的组件库来渲染你的数据模型。由于我们构建的是静态版本，所以这些组件目前只需
 提供 render() 方法用于渲染。最顶层的组件 FilterableProductTable 通过 props 接受你的数据模型。如果你的数
 据模型发生了改变，再次调用 ReactDOM.render()，UI 就会相应地被更新。数据模型变化、调用 render() 方法、UI
 相应变化，这个过程并不复杂，因此很容易看清楚 UI 是如何被更新的，以及是在哪里被更新的。React 单向数据流（也叫
 单向绑定）的思想使得组件模块化，易于快速开发。

 如果你在完成这一步骤时遇到了困难，可以参阅 React 文档。

 补充说明: 有关 props 和 state
    在 React 中，有两类“模型”数据：props 和 state。清楚地理解两者的区别是十分重要的；如果你不太有把握，可以
 参阅 React 官方文档。你也可以查看 FAQ: state 与 props 的区别是什么？
 */


/**
 Now that you have your component hierarchy, it’s time to implement your app. The easiest way
 is to build a version that takes your data model and renders the UI but has no interactivity.
 It’s best to decouple these processes because building a static version requires a lot of
 typing and no thinking, and adding interactivity requires a lot of thinking and not a lot
 of typing. We’ll see why.

 现在我们已经确定了组件层级，可以编写对应的应用了。最容易的方式，是先用已有的数据模型渲染一个不包含交互功能的 UI。
 最好将渲染 UI 和添加交互这两个过程分开。这是因为，编写一个应用的静态版本时，往往要编写大量代码，而不需要考虑太多交
 互细节；添加交互功能时则要考虑大量细节，而不需要编写太多代码。所以，将这两个过程分开进行更为合适。

 我们会在接下来的代码中体会到其中的区别。
 */
