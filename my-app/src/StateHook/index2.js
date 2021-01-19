/**
 为什么要在 effect 中返回一个函数？
 这是 effect 可选的清除机制。每个 effect 都可以返回一个清除函数。
 如此可以将添加和移除订阅的逻辑放在一起。它们都属于 effect 的一部分。


 React 何时清除 effect？
 React 会在组件卸载的时候执行清除操作。正如之前学到的，effect 在每次渲染的时候都会执行。
 这就是为什么 React 会在执行当前 effect 之前对上一个 effect 进行清除。
 我们稍后将讨论为什么这将助于避免 bug以及如何在遇到性能问题时跳过此行为。

 注意
 并不是必须为 effect 中返回的函数命名。
 这里我们将其命名为 cleanup 是为了表明此函数的目的，但其实也可以返回一个箭头函数或者给起一个别的名字。
 */

import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
    const [isOnline, setIsOnline] = useState(null);

    useEffect(() => {
        function handleStatusChange(status) {
            setIsOnline(status.isOnline);
        }
        ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
        // Specify how to clean up after this effect:
        return function cleanup() {
            ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
        };
    });

    if (isOnline === null) {
        return 'Loading...';
    }
    return isOnline ? 'Online' : 'Offline';
}
