/**
 提示：在多个 Hook 之间传递信息
 由于 Hook 本身就是函数，因此我们可以在它们之间传递信息。

 我们将使用聊天程序中的另一个组件来说明这一点。这是一个聊天消息接收者的选择器，它会显示当前选定的好友是否在线:
 */
import { useState, useEffect } from 'react';
import { useFriendStatus } from './3.Using a Custom Hook';

const friendList = [
    { id: 1, name: 'Phoebe' },
    { id: 2, name: 'Rachel' },
    { id: 3, name: 'Ross' },
];


function Circle(props) {
    return (
        <li> {props.friend.name} </li>
    );
}
function ChatRecipientPicker() {
    const [recipientID, setRecipientID] = useState(1);
    const isRecipientOnline = useFriendStatus(recipientID);

    return (
        <>
            <Circle color={isRecipientOnline ? 'green' : 'red'} />
            <select
                value={recipientID}
                onChange={e => setRecipientID(Number(e.target.value))}
            >
                {friendList.map(friend => (
                    <option key={friend.id} value={friend.id}>
                        {friend.name}
                    </option>
                ))}
            </select>
        </>
    );
}


/**
 我们将当前选择的好友 ID 保存在 recipientID 状态变量中，并在用户从 <select> 中选择其他好友时更新这个 state。

 由于 useState 为我们提供了 recipientID 状态变量的最新值，因此我们可以将它作为参数传递给自定义的 useFriendStatus Hook：

 如此可以让我们知道当前选中的好友是否在线。当我们选择不同的好友并更新 recipientID 状态变量时，
 useFriendStatus Hook 将会取消订阅之前选中的好友，并订阅新选中的好友状态。
 */















































































