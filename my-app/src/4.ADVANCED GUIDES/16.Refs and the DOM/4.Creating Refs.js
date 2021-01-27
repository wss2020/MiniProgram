/**
 创建 Refs

    Refs 是使用 React.createRef() 创建的，并通过 ref 属性附加到 React 元素。
 在构造组件时，通常将 Refs 分配给实例属性，以便可以在整个组件中引用它们。
 */

class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }
    render() {
        return <div ref={this.myRef} />;
    }
}






