/**
 事件处理

 React 元素的事件处理和 DOM 元素的很相似，但是有一点语法上的不同：

     React 事件的命名采用小驼峰式（camelCase），而不是纯小写。
     使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串。
 */


//例如，传统的 HTML：
<button onClick="activateLasers()">
    Activate Lasers
</button>


//在 React 中略微不同：
const data = (
    <button onClick={activateLasers}>
        Activate Lasers
    </button>
);


//在 React 中另一个不同点是你不能通过返回 false 的方式阻止默认行为。你必须显式的使用 preventDefault 。
// 例如，传统的 HTML 中阻止链接默认打开一个新页面，你可以这样写：
<a href="#" onClick="console.log('The link was clicked.'); return false">
    Click me
</a>

// 在 React 中，可能是这样的：
function ActionLink() {
    function handleClick(e) {
        e.preventDefault();
        console.log('The link was clicked.');
    }

    return (
        <a href="#" onClick={handleClick}>
            Click me
        </a>
    );
}


/**
    在这里，e 是一个合成事件。React 根据 W3C 规范来定义这些合成事件，所以你不需要担心跨浏览器的兼容性问题。
 React 事件与原生事件不完全相同。如果想了解更多，请查看 SyntheticEvent 参考指南。

    使用 React 时，你一般不需要使用 addEventListener 为已创建的 DOM 元素添加监听器。
 事实上，你只需要在该元素初始渲染的时候添加监听器即可。

    当你使用 ES6 class 语法定义一个组件的时候，通常的做法是将事件处理函数声明为 class 中的方法。
 例如，下面的 Toggle 组件会渲染一个让用户切换开关状态的按钮：
 */










