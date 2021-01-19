import React, { useState, useEffect } from 'react';


/**
    现在我们假设聊天应用中有一个联系人列表，当用户在线时需要把名字设置为绿色。
 我们可以把上面类似的逻辑复制并粘贴到 FriendListItem 组件中来，但这并不是理想的解决方案：


 相反，我们希望在 FriendStatus 和 FriendListItem 之间共享逻辑。

 目前为止，在 React 中有两种流行的方式来共享组件之间的状态逻辑: render props 和高阶组件，
 现在让我们来看看 Hook 是如何在让你不增加组件的情况下解决相同问题的。
 */
function FriendStatus(props) {
    const [isOnline, setIsOnline] = useState(null);
    useEffect(() => {
        function handleStatusChange(status) {
            setIsOnline(status.isOnline);
        }
        ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
        return () => {
            ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
        };
    });

    return (
        <li style={{ color: isOnline ? 'green' : 'black' }}>
            {props.friend.name}
        </li>
    );
}














