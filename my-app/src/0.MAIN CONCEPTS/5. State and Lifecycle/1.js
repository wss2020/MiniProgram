// State & 生命周期

/**
    请参考前一章节中时钟的例子。在元素渲染章节中，我们只了解了一种更新 UI 界面的方法。
 通过调用 ReactDOM.render() 来修改我们想要渲染的元素：
 */
function tick() {
    const element = (
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {new Date().toLocaleTimeString()}.</h2>
        </div>
    );
    ReactDOM.render(
        element,
        document.getElementById('root')
    );
}

setInterval(tick, 1000);















