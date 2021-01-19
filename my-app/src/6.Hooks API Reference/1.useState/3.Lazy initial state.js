/**
    initialState 参数只会在组件的初始渲染中起作用，后续渲染时会被忽略。如果初始 state 需要通过复杂计算获得，
 则可以传入一个函数，在函数中计算并返回初始的 state，此函数只在初始渲染时被调用：
 */
import React, {useState, useEffect} from 'react';

const [state, setState] = useState(() => {
    const initialState = someExpensiveComputation(props);
    return initialState;
});








































