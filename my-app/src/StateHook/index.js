import React, { useState } from 'react';

export function Index() {
    // 声明一个叫 "count" 的 state 变量
    const [count, setCount] = useState(0);
    const [fruit, setFruit] = useState('banana');
    const [todos, setTodos] = useState([{ text: '学习 Hook' }]);

    return (
        <div>
            <div>
                <p>You clicked {count} times</p>
                <button onClick={() => setCount(count + 1)}> Click me</button>
            </div>
            <div>-------------------------------------------------------------------------</div>
            <div>
                <p>{fruit}</p>
                <button onClick={() => setFruit('apple')}>换水果</button>
            </div>
            <div>-------------------------------------------------------------------------</div>
            <div>
                <p>{todos[0].text}</p>
                <button onClick={() => setTodos([{ text: '学习设置 Hook' }]) }> setTodos</button>
            </div>
        </div>
    );
}
