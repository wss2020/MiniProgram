/**
 指定初始 state
    有两种不同初始化 useReducer state 的方式，你可以根据使用场景选择其中的一种。

 将初始 state 作为第二个参数传入 useReducer 是最简单的方法：
 */
import React, {useReducer} from 'react';

const initialCount = 1;
const [state, dispatch] = useReducer(
    reducer,
    {count: initialCount}
);

/**
 注意

 React 不使用 state = initialState 这一由 Redux 推广开来的参数约定。
 有时候初始值依赖于 props，因此需要在调用 Hook 时指定。如果你特别喜欢上述的参数约定，
 可以通过调用 useReducer(reducer, undefined, reducer) 来模拟 Redux 的行为，但我们不鼓励你这么做。
 */
