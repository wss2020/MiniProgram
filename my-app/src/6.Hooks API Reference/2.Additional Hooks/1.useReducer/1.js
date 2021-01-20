import React, {useReducer} from 'react';
import "./style.css"
/**
    useState 的替代方案。它接收一个形如 (state, action) => newState 的 reducer，
 并返回当前的 state 以及与其配套的 dispatch 方法。（如果你熟悉 Redux 的话，就已经知道它如何工作了。）

    在某些场景下，useReducer 会比 useState 更适用，例如 state 逻辑较复杂且包含多个子值，或者下一个
 state 依赖于之前的 state 等。并且，使用 useReducer 还能给那些会触发深更新的组件做性能优化，因为你
 可以向子组件传递 dispatch 而不是回调函数 。

 Here’s the counter example from the useState section, rewritten to use a reducer:
 */

const initialState = {count: 0};

function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return {count: state.count + 1};
        case 'decrement':
            return {count: state.count - 1};
        default:
            throw new Error();
    }
}

function Counter() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <>
            Count: {state.count}
            <button className='btn2' onClick={() => dispatch({type: 'decrement'})}>-</button>
            <button className='btn2' onClick={() => dispatch({type: 'increment'})}>+</button>
        </>
    );
}

export function Index(){
    return (
        <div>
            <div>计数器:</div>
            <div>
                <Counter />
            </div>
        </div>
    )
}

/**
 注意
    React 会确保 dispatch 函数的标识是稳定的，并且不会在组件重新渲染时改变。
 这就是为什么可以安全地从 useEffect 或 useCallback 的依赖列表中省略 dispatch。
 */





