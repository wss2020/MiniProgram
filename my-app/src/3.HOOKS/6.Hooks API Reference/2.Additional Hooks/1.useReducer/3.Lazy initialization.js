/**
 惰性初始化

 你可以选择惰性地创建初始 state。为此，需要将 init 函数作为 useReducer 的第三个参数传入，这样初始 state 将被设置为 init(initialArg)。

 这么做可以将用于计算 state 的逻辑提取到 reducer 外部，这也为将来对重置 state 的 action 做处理提供了便利：
 */
import "./style.css"
import {useReducer} from 'react';

function init(initialCount) {
    return {count: initialCount};
}

function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return {count: state.count + 1};
        case 'decrement':
            return {count: state.count - 1};
        case 'reset':
            return init(action.payload);
        default:
            throw new Error();
    }
}

function Counter({initialCount}) {
    const [state, dispatch] = useReducer(reducer, initialCount, init);
    return (
        <>
            Count: {state.count}
            <button
                className='btn1'
                onClick={() => dispatch({type: 'reset', payload: initialCount})}>
                Reset
            </button>
            <button className='btn2' onClick={() => dispatch({type: 'decrement'})}>-</button>
            <button className='btn3' onClick={() => dispatch({type: 'increment'})}>+</button>
        </>
    );
}

export function Index1(){
    return (
        <div>
            <div>计数器:</div>
            <div>
                <Counter initialCount={0} />
            </div>
        </div>
    )
}
