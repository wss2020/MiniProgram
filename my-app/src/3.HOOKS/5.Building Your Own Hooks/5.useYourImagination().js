/**
    自定义 Hook 解决了以前在 React 组件中无法灵活共享逻辑的问题。你可以创建涵盖各种场景的自定义 Hook，如表单处理、动画、订阅声明、计时器，
 甚至可能还有其他我们没想到的场景。更重要的是，创建自定义 Hook 就像使用 React 内置的功能一样简单。

    尽量避免过早地增加抽象逻辑。既然函数组件能够做的更多，那么代码库中函数组件的代码行数可能会剧增。这属于正常现象 —— 不必立即将它们拆分为 Hook。
 但我们仍鼓励你能通过自定义 Hook 寻找可能，以达到简化代码逻辑，解决组件杂乱无章的目的。

    例如，有个复杂的组件，其中包含了大量以特殊的方式来管理的内部状态。useState 并不会使得集中更新逻辑变得容易，
 因此你可能更愿意使用 redux 中的 reducer 来编写。
 */
import React, {useState, useEffect} from 'react';
function todosReducer(state, action) {
    switch (action.type) {
        case 'add':
            return [...state, {
                text: action.text,
                completed: false
            }];
        // ... other actions ...
        default:
            return state;
    }
}

/**
    Reducers 非常便于单独测试，且易于扩展，以表达复杂的更新逻辑。如有必要，您可以将它们分成更小的 reducer。但是，
 你可能还享受着 React 内部 state 带来的好处，或者可能根本不想安装其他库。

    那么，为什么我们不编写一个 useReducer 的 Hook，使用 reducer 的方式来管理组件的内部 state 呢？其简化版本可能如下所示：
 */
function useReducer(reducer, initialState) {
    const [state, setState] = useState(initialState);

    function dispatch(action) {
        const nextState = reducer(state, action);
        setState(nextState);
    }

    return [state, dispatch];
}

// 在组件中使用它，让 reducer 驱动它管理 state：
function Todos() {
    const [todos, dispatch] = useReducer(todosReducer, []);

    function handleAddClick(text) {
        dispatch({ type: 'add', text });
    }

    // ...
}

/**
    在复杂组件中使用 reducer 管理内部 state 的需求很常见，我们已经将 useReducer 的 Hook 内置到 React 中。
 你可以在 Hook API 索引中找到它使用，搭配其他内置的 Hook 一起使用。
 */
















