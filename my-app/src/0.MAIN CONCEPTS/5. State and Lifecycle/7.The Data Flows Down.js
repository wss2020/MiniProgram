/**
 数据是向下流动的

 不管是父组件或是子组件都无法知道某个组件是有状态的还是无状态的，并且它们也并不关心它是函数组件还是 class 组件。

 这就是为什么称 state 为局部的或是封装的的原因。除了拥有并设置了它的组件，其他组件都无法访问。

 组件可以选择把它的 state 作为 props 向下传递到它的子组件中：
 */
<FormattedDate date={this.state.date} />



/**
    FormattedDate 组件会在其 props 中接收参数 date，但是组件本身无法知道它是来自于 Clock 的 state，
 或是 Clock 的 props，还是手动输入的：
 */
function FormattedDate(props) {
    return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}


/**
    这通常会被叫做“自上而下”或是“单向”的数据流。任何的 state 总是所属于特定的组件，而且从该 state 派生的任何数据
 或 UI 只能影响树中“低于”它们的组件。

    如果你把一个以组件构成的树想象成一个 props 的数据瀑布的话，那么每一个组件的 state 就像是在任意一点上给瀑布
 增加额外的水源，但是它只能向下流动。

 为了证明每个组件都是真正独立的，我们可以创建一个渲染三个 Clock 的 App 组件：
 */

function App() {
    return (
        <div>
            <Clock />
            <Clock />
            <Clock />
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

/**
 每个 Clock 组件都会单独设置它自己的计时器并且更新它。

 在 React 应用中，组件是有状态组件还是无状态组件属于组件实现的细节，它可能会随着时间的推移而改变。
 你可以在有状态的组件中使用无状态的组件，反之亦然。
 */









