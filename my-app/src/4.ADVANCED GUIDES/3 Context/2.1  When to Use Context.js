/**
 何时使用 Context

    Context 设计目的是为了共享那些对于一个组件树而言是“全局”的数据，例如当前认证的用户、主题或首选语言。举个例子，在下面的代码中，我们通过一个
 “theme” 属性手动调整一个按钮组件的样式：
 */
import React from 'react';
class App extends React.Component {
    render() {
        return <Toolbar theme="dark" />;
    }
}

function Toolbar(props) {
    // Toolbar 组件接受一个额外的“theme”属性，然后传递给 ThemedButton 组件。
    // 如果应用中每一个单独的按钮都需要知道 theme 的值，这会是件很麻烦的事，
    // 因为必须将这个值层层传递所有组件。
    return (
        <div>
            <ThemedButton theme={props.theme} />
        </div>
    );
}

class ThemedButton extends React.Component {
    render() {
        return <Button theme={this.props.theme} />;
    }
}


// 使用 context, 我们可以避免通过中间元素传递 props：














