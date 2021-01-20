// 将一个元素渲染为 DOM


// 假设你的 HTML 文件某处有一个 <div>：
<div id="root"></div>


/**
 我们将其称为“根” DOM 节点，因为该节点内的所有内容都将由 React DOM 管理。

 仅使用 React 构建的应用通常只有单一的根 DOM 节点。如果你在将 React 集成进一个已有应用，那么你可以在应用中包含任意多的独立根 DOM 节点。

 想要将一个 React 元素渲染到根 DOM 节点中，只需把它们一起传入 ReactDOM.render()：
 */


const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));





