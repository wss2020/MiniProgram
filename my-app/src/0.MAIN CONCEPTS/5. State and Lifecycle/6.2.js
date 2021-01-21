import React, { useState } from 'react';

export function App() {

    const [obj1, setObj1] = useState({ a: 1 });
    const [obj2, setObj2] = useState({ a: 2 });

    // 猜猜看obj1会不会实时更新，obj2呢
    return (
        <div className="App">
            <div>{JSON.stringify(obj1)}</div>
            <button onClick={() => {
                obj1.a = 2;
                setObj1(obj1)
            }}>点我暴力+1</button>

            <div>----------------------------------------------------------------------</div>

            <div>{JSON.stringify(obj2)}</div>
            <button onClick={() => {
                let newObj2 = Object.assign({}, obj2);
                ++newObj2.a;
                setObj2(newObj2);
            }}>我创建一个新对象 + 1</button>
        </div>
    );
}

