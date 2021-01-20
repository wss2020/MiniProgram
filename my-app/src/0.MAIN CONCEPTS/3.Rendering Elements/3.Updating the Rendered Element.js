/**
 更新已渲染的元素

 React 元素是不可变对象。一旦被创建，你就无法更改它的子元素或者属性。一个元素就像电影的单帧：它代表了某个特定时刻的 UI。

 根据我们已有的知识，更新 UI 唯一的方式是创建一个全新的元素，并将其传入 ReactDOM.render()。

 考虑一个计时器的例子：
 */
function tick() {
    const element = (
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {new Date().toLocaleTimeString()}.</h2>
        </div>
    );
    ReactDOM.render(element, document.getElementById('root'));
}

setInterval(tick, 1000);

// 这个例子会在 setInterval() 回调函数，每秒都调用 ReactDOM.render()。


/**
 注意：

 在实践中，大多数 React 应用只会调用一次 ReactDOM.render()。在下一个章节，我们将学习如何将这些代码封装到有状态组件中。

 我们建议你不要跳跃着阅读，因为每个话题都是紧密联系的。
 */












