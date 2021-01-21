import {useState} from "react";

export function LoginControl() {
    const [isLoggedIn, setIsLoggedIn] = useState({isLoggedIn: false});

    function handleLoginClick() {
        setIsLoggedIn({isLoggedIn: true});
    }

    function handleLogoutClick() {
        setIsLoggedIn({isLoggedIn: false});
    }

    function Greeting(prop){
        return (
            <div>{prop.data.isLoggedIn ? '已经登录' : '未登录'}</div>
        )
    }

    function result() {
        let button;
        if (isLoggedIn.isLoggedIn) {
            button = <button onClick={handleLogoutClick}>点击退出</button>;
        } else {
            button = <button onClick={handleLoginClick}>点击登录</button>;
        }
        return (
            <div>
                <Greeting data={isLoggedIn}/>
                {button}
            </div>
        )
    }

    return result();
}















