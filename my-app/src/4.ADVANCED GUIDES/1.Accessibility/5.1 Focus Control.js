/**
 控制焦点

 确保你的网络应用在即使只拥有键盘的环境下正常运作。

 WebAIM 讨论使用键盘进行无障碍访问

 键盘焦点及焦点轮廓
     键盘焦点的定义是：在 DOM 中，当前被选中来接受键盘信息的元素。我们可以在各处看到键盘焦点，它会被焦点轮廓包围，像下面的这个图像一样。

     https://reactjs.bootcss.com/static/dec0e6bcc1f882baf76ebc860d4f04e5/4fcfe/keyboard-focus.png

     请不要使用 CSS 移除这个轮廓，比如设置 outline: 0，除非你将使用其他的方法实现焦点轮廓


 跳过内容机制
     为了帮助和提速键盘导航，我们提供了一种机制，可以帮助用户跳过一些导航段落。

     跳转链接（Skiplinks），或者说跳转导航链接（Skip Navigation Links）是一种隐藏的导航链接，它只会在使用键盘导航时可见。使用网页内部锚点和一些式样可以很容易地实现它：

     WebAIM - 跳转导航链接（Skip Navigation Links）
     另外，使用地标元素和角色，比如 <main> 和 <aside>，作为辅助来划分网页的区域可以让用户快速导航至这些部分。

     你可以通过下面的链接了解更多如何使用这些元素来增强无障碍辅助功能：

     无障碍地标


 使用程序管理焦点
        我们的 React 应用在运行时会持续更改 HTML DOM，有时这将会导致键盘焦点的丢失或者是被设置到了意料之外的元素上。为了修复这类问题，
     我们需要以编程的方式让键盘聚焦到正确的方向上。比方说，在一个弹窗被关闭的时候，重新设置键盘焦点到弹窗的打开按钮上。

     MDN Web 文档关注了这个问题并向我们解释了可以如何搭建可用键盘导航的 JavaScript 部件。

     我们可以用 DOM 元素的 Refs 在 React 中设置焦点。

     用以上技术，我们先在一个 class 组件的 JSX 中创建一个元素的 ref：
 */
    class CustomTextInput extends React.Component {
        constructor(props) {
            super(props);
            // 创造一个 textInput DOM 元素的 ref
            this.textInput = React.createRef();
        }
        render() {
            // 使用 `ref` 回调函数以在实例的一个变量中存储文本输入 DOM 元素
            //（比如，this.textInput）。
            return (
                <input
                    type="text"
                    ref={this.textInput}
                />
            );
        }
    }


// 然后我们就可以在需要时于其他地方把焦点设置在这个组件上：
focus() {
    // 使用原始的 DOM API 显式地聚焦在 text input 上
    // 注意：我们通过访问 “current” 来获得 DOM 节点
    this.textInput.current.focus();
}



