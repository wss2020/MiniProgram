/**
    如果想执行只运行一次的 effect（仅在组件挂载和卸载时执行），可以传递一个空数组（[]）作为第二个参数。
 这就告诉 React 你的 effect 不依赖于 props 或 state 中的任何值，所以它永远都不需要重复执行。
 这并不属于特殊情况 —— 它依然遵循依赖数组的工作方式。

    如果你传入了一个空数组（[]），effect 内部的 props 和 state 就会一直拥有其初始值。
 尽管传入 [] 作为第二个参数更接近大家更熟悉的 componentDidMount 和 componentWillUnmount 思维模式，
 但我们有更好的方式来避免过于频繁的重复调用 effect。除此之外，请记得 React 会等待浏览器完成画面渲染之后
 才会延迟调用 useEffect，因此会使得额外操作很方便。
 */


import React, {useState, useEffect} from 'react';

export function Index() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log(count);
        document.title = `You clicked ${count} times`;

        return ()=>{
            console.log('componentDidMount | componentDidUpdate | componentWillUnMount');
        }
    }, [count]);    // 仅在 count 更改时更新

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount( count===10 ? 10 :count+1 )}>
                Click me
            </button>
        </div>
    );
}
