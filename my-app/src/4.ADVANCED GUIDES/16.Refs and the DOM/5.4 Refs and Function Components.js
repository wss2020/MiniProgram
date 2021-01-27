// Refs 与函数组件

// 默认情况下，你不能在函数组件上使用 ref 属性，因为它们没有实例：
function MyFunctionComponent() {
    return <input />;
}

class Parent extends React.Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
    }
    render() {
        // This will *not* work!
        return (
            <MyFunctionComponent ref={this.textInput} />
        );
    }
}

/**
 如果要在函数组件中使用 ref，你可以使用 forwardRef（可与 useImperativeHandle 结合使用），或者可以将该组件转化为 class 组件。

 不管怎样，你可以在函数组件内部使用 ref 属性，只要它指向一个 DOM 元素或 class 组件：
 */











