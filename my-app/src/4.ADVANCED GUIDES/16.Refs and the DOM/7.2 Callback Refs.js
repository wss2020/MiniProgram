/**

 你可以在组件间传递回调形式的 refs，就像你可以传递通过 React.createRef() 创建的对象 refs 一样
 */

import React from 'react';
function CustomTextInput(props) {
    return (
        <div>
            <input ref={props.inputRef} />
        </div>
    );
}

export class Parent extends React.Component {
    constructor(props) {
        super(props);

        this.textInput = null;

        this.setTextInputRef = el => {
            this.textInput = el;
        };

        this.focusTextInput = () => {
            if (this.textInput) this.textInput.focus();
        };
    }

    componentDidMount() {
        this.focusTextInput();
    }

    render() {
        return (
            <div>
                <CustomTextInput
                    inputRef={this.setTextInputRef}
                />
                <input
                    type="button"
                    value="Focus the text input"
                    onClick={this.focusTextInput}
                />
            </div>
        );
    }
}

/**
    在上面的例子中，Parent 把它的 refs 回调函数当作 inputRef props 传递给了 CustomTextInput，而且 CustomTextInput 把相同的函数作为
 特殊的 ref 属性传递给了 <input>。结果是，在 Parent 中的 this.inputElement 会被设置为与 CustomTextInput 中的 input 元素相对应的 DOM
 节点。
 */


