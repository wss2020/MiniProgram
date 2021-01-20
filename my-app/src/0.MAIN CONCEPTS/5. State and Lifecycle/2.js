
/**
 在本章节中，我们将学习如何封装真正可复用的 Clock 组件。它将设置自己的计时器并每秒更新一次。

 我们可以从封装时钟的外观开始：
 */
function Clock(props) {
    return (
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {props.date.toLocaleTimeString()}.</h2>
        </div>
    );
}

function tick() {
    ReactDOM.render(
        <Clock date={new Date()} />,
        document.getElementById('root')
    );
}

setInterval(tick, 1000);


/**
 然而，它忽略了一个关键的技术细节：Clock 组件需要设置一个计时器，并且需要每秒更新 UI。

 理想情况下，我们希望只编写一次代码，便可以让 Clock 组件自我更新：
 */
// ReactDOM.render(
//     <Clock />,
//     document.getElementById('root')
// );

/**
 我们需要在 Clock 组件中添加 “state” 来实现这个功能。

 State 与 props 类似，但是 state 是私有的，并且完全受控于当前组件。
 */










