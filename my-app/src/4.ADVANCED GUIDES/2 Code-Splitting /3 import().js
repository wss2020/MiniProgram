/**
 import()

 在你的应用中引入代码分割的最佳方式是通过动态 import() 语法。

 使用之前：
 */
import { add } from './math';
console.log(add(16, 26));



// 使用之后：
import("./math").then(math => {
    console.log(math.add(16, 26));
});


/**
    当 Webpack 解析到该语法时，会自动进行代码分割。如果你使用 Create React App，该功能已开箱即用，你可以立刻使用该特性。Next.js 也已支持该特
 性而无需进行配置。

    如果你自己配置 Webpack，你可能要阅读下 Webpack 关于代码分割的指南。你的 Webpack 配置应该类似于此。

    当使用 Babel 时，你要确保 Babel 能够解析动态 import 语法而不是将其进行转换。对于这一要求你需要 @babel/plugin-syntax-dynamic-import
 插件。
 */









