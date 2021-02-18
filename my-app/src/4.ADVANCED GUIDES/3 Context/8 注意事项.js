/**
 注意事项
    因为 context 会使用参考标识（reference identity）来决定何时进行渲染，这里可能会有一些陷阱，当 provider 的父组件进行重渲染时，可能会在
 consumers 组件中触发意外的渲染。举个例子，当每一次 Provider 重渲染时，以下的代码会重渲染所有下面的 consumers 组件，因为 value 属性总是被
 赋值为新的对象：
 */

class App extends React.Component {
    render() {
        return (
            <MyContext.Provider value={{something: 'something'}}>
                <Toolbar />
            </MyContext.Provider>
        );
    }
}

//为了防止这种情况，将 value 状态提升到父节点的 state 里：
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: {something: 'something'},
        };
    }

    render() {
        return (
            <Provider value={this.state.value}>
                <Toolbar />
            </Provider>
        );
    }
}


















