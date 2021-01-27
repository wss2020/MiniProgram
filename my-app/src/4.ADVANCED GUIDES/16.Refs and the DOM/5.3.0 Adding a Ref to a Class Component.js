/**
 为 class 组件添加 Ref

    如果我们想包装上面的 CustomTextInput，来模拟它挂载之后立即被点击的操作，我们可以使用 ref 来获取这个自定
 义的 input 组件并手动调用它的 focusTextInput 方法：
 */
import React from 'react';
import {CustomTextInput} from './5.2 Adding a Ref to a DOM Element'
export class AutoFocusTextInput extends React.Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
    }

    componentDidMount() {
        this.textInput.current.focusTextInput();
    }

    render() {
        return (
            <CustomTextInput ref={this.textInput} />
        );
    }
}

// 请注意，这仅在 CustomTextInput 声明为 class 时才有效：
// class CustomTextInput extends React.Component {  // ...     }






