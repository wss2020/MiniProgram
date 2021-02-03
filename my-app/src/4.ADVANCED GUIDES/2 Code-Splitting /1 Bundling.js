/**
 代码分割

 Bundling
 打包
    大多数 React 应用都会使用 Webpack，Rollup 或 Browserify 这类的构建工具来打包文件。打包是一个将文件引入并合并到一个单独文件的过程，最终
 形成一个 “bundle”。接着在页面上引入该 bundle，整个应用即可一次性加载。


 示例
 App文件：
 */

// app.js
import { add } from './math.js';
console.log(add(16, 26)); // 42


// math.js
export function add(a, b) {
    return a + b;
}



// 打包后文件：
function add(a, b) {
    return a + b;
}

console.log(add(16, 26)); // 42



/**
 注意：
 最终你的打包文件看起来会和上面的例子区别很大。

 如果你正在使用 Create React App，Next.js，Gatsby，或者类似的工具，你可以直接使用的 Webpack 配置来构建你的应用。


 如果你没有使用这类工具，你就需要自己来进行配置。例如，查看 Webpack 文档上的安装和入门教程。
 */

























































































