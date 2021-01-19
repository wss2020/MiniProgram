/**
    如果新的 state 需要通过使用先前的 state 计算得出，那么可以将函数传递给 setState。
 该函数将接收先前的 state，并返回一个更新后的值。下面的计数器组件示例展示了 setState 的两种用法
 */

import React, {useState, useEffect} from 'react';
import "./style.css"

function Counter({initialCount}) {
    const [count, setCount] = useState(initialCount);

    function del(){
        if(count !==0) setCount(count - 1);
    }
    function add(){
        setCount(count + 1);
    }

    return (
        <>
            Count: {count}
            <button className='btn1' onClick={() => setCount(initialCount)}>Reset</button>
            <button className='btn2' onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
            <button className='btn2' onClick={ () =>del() }>-</button>
            <button className='btn3' onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
            <button className='btn3' onClick={() => add() }>+</button>
        </>
    );
}

export function Index(){
    return (
        <div>
            <div>计数器:</div>
            <div>
                <Counter initialCount={0}  />
            </div>
        </div>
    )
}

/**
 “+” 和 “-” 按钮采用函数式形式，因为被更新的 state 需要基于之前的 state。但是“重置”按钮则采用普通形式，因为它总是把 count 设置回初始值。

 如果你的更新函数返回值与当前 state 完全相同，则随后的重渲染会被完全跳过。



 注意

 与 class 组件中的 setState 方法不同，useState 不会自动合并更新对象。你可以用函数式的 setState 结合展开运算符来达到合并更新对象的效果。

 useReducer 是另一种可选方案，它更适合用于管理包含多个子值的 state 对象。
 */
setState(prevState => {
    // 也可以使用 Object.assign
    return {...prevState, ...updatedValues};
});







