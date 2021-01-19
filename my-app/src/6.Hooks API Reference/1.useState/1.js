import React, {useState, useEffect} from 'react';

const [state, setState] = useState(initialState);

/**
 返回一个 state，以及更新 state 的函数。

 在初始渲染期间，返回的状态 (state) 与传入的第一个参数 (initialState) 值相同。

 setState 函数用于更新 state。它接收一个新的 state 值并将组件的一次重新渲染加入队列。

 setState(newState);

 在后续的重新渲染中，useState 返回的第一个值将始终是更新后最新的 state。

 注意
    React 会确保 setState 函数的标识是稳定的，并且不会在组件重新渲染时发生变化。
 这就是为什么可以安全地从 useEffect 或 useCallback 的依赖列表中省略 setState。
 */










