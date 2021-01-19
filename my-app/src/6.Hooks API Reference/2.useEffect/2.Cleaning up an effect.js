/**
 通常，组件卸载时需要清除 effect 创建的诸如订阅或计时器 ID 等资源。要实现这一点，useEffect 函数需返回一个清除函数。
 以下就是一个创建订阅的例子：
 */

import React, {useState, useEffect} from 'react';

useEffect(() => {
    const subscription = props.source.subscribe();
    return () => {
        // 清除订阅
        subscription.unsubscribe();
    };
});


/**
    为防止内存泄漏，清除函数会在组件卸载前执行。另外，如果组件多次渲染（通常如此），则在执行下一个 effect 之前，上一个 effect 就已被清除。
 在上述示例中，意味着组件的每一次更新都会创建新的订阅。若想避免每次更新都触发 effect 的执行，请参阅下一小节。
 */
