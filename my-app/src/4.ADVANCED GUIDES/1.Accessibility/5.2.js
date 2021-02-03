
/**
    有时，父组件需要把焦点设置在其子组件的一个元素上。我们可以通过在子组件上设置一个特殊的 prop 来对父组件暴露 DOM refs 从而把父组件的 ref
 传向子节点的 DOM 节点。
 */

function CustomTextInput(props) {
    return (
        <div>
            <input ref={props.inputRef} />
        </div>
    );
}

class Parent extends React.Component {
    constructor(props) {
        super(props);
        this.inputElement = React.createRef();
    }

    componentDidMount() {
        // 现在你就可以在需要时设置焦点了
        this.inputElement.current.focus();
    }

    render() {
        return (
            <CustomTextInput inputRef={this.inputElement} />
        );
    }
}


/**
    当使用 HOC 来扩展组件时，我们建议使用 React 的 forwardRef 函数来向被包裹的组件转发 ref。如果第三方的 HOC 不支持转发 ref，上面的方法仍可
 以作为一种备选方案。

    react-aria-modal 提供了一个很好的焦点管理的例子。 这是一个少有的完全无障碍的模态窗口的例子。它不仅仅把初始焦点设置在了取消按钮上（防止键盘用
 户意外激活成功操作）和把键盘焦点固定在了窗口之内， 关闭窗口时它也会把键盘焦点重置到打开窗口的那一个元素上。


 注意:
 虽然这是一个非常重要的无障碍辅助功能，但它也是一种应该谨慎使用的技术。 我们应该在受到干扰时使用它来修复键盘焦点，而不是试图预测用户想要如何使用应用程序。
 */









