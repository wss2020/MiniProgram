import  {useDebugValue,useState} from 'react';

useDebugValue(value);

/**
 useDebugValue 可用于在 React 开发者工具中显示自定义 hook 的标签。

 例如，“自定义 Hook” 章节中描述的名为 useFriendStatus 的自定义 Hook：
 */

function useFriendStatus(friendID) {
    const [isOnline, setIsOnline] = useState(null);

    // ...

    // 在开发者工具中的这个 Hook 旁边显示标签
    // e.g. "FriendStatus: Online"
    useDebugValue(isOnline ? 'Online' : 'Offline');

    return isOnline;
}


/**
 提示
 我们不推荐你向每个自定义 Hook 添加 debug 值。当它作为共享库的一部分时才最有价值。
 */
