/**
 Only Call Hooks at the Top Level
    不要在循环，条件或嵌套函数中调用 Hook， 确保总是在你的 React 函数的最顶层调用他们。遵守这条规则，你就能确保 Hook 在每一次渲染中
 都按照同样的顺序被调用。这让 React 能够在多次的 useState 和 useEffect 调用之间保持 hook 状态的正确。(如果你对此感到好奇，我们在
 下面会有更深入的解释。)


 Only Call Hooks from React Functions
 不要在普通的 JavaScript 函数中调用 Hook。你可以：
    ✅ 在 React 的函数组件中调用 Hook
    ✅ 在自定义 Hook 中调用其他 Hook (我们将会在下一页 中学习这个。)
 遵循此规则，确保组件的状态逻辑在代码中清晰可见。
 */

import React, { useState } from 'react';



/**
 那么 React 怎么知道哪个 state 对应哪个 useState？
 答案是 React 靠的是 Hook 调用的顺序。因为我们的示例中，Hook 的调用顺序在每次渲染中都是相同的，所以它能够正常工作：

    只要 Hook 的调用顺序在多次渲染之间保持一致，React 就能正确地将内部 state 和对应的 Hook 进行关联。但如果我们
 将一个 Hook (例如 persistForm effect) 调用放到一个条件语句中会发生什么呢？
 */
// As we learned earlier, we can use multiple State or Effect Hooks in a single component:
function Form() {
    // 1. Use the name state variable
    const [name, setName] = useState('Mary');

    // 2. Use an effect for persisting the form
    useEffect(function persistForm() {
        // 👍 将条件判断放置在 effect 中
        if (name !== '') {
            localStorage.setItem('formData', name);
        }
    });

    // 3. Use the surname state variable
    const [surname, setSurname] = useState('Poppins');

    // 4. Use an effect for updating the title
    useEffect(function updateTitle() {
        document.title = name + ' ' + surname;
    });

    // ...
}






