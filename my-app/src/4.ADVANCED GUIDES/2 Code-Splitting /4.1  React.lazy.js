/**
 注意:

    React.lazy 和 Suspense 技术还不支持服务端渲染。如果你想要在使用服务端渲染的应用中使用，我们推荐 Loadable Components 这个库。它有一个很
 棒的服务端渲染打包指南。

 React.lazy 函数能让你像渲染常规组件一样处理动态引入（的组件）。

 */


// 使用之前：
import OtherComponent from './OtherComponent';



// 使用之后：
const OtherComponent = React.lazy(() => import('./OtherComponent'));


/**
 此代码将会在组件首次渲染时，自动导入包含 OtherComponent 组件的包。

    React.lazy 接受一个函数，这个函数需要动态调用 import()。它必须返回一个 Promise，该 Promise 需要 resolve 一个 default export 的
 React 组件。

 然后应在 Suspense 组件中渲染 lazy 组件，如此使得我们可以使用在等待加载 lazy 组件时做优雅降级（如 loading 指示器等）。
 */

















