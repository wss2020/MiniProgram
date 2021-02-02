
/**
 如果要在函数组件中使用 ref，你可以使用 forwardRef（可与 useImperativeHandle 结合使用），或者可以将该组件转化为 class 组件。

 不管怎样，你可以在函数组件内部使用 ref 属性，只要它指向一个 DOM 元素或 class 组件：
 */
import {useRef} from 'react';
export function CustomTextInput(props) {
    // 这里必须声明 textInput，这样 ref 才可以引用它
    const textInput = useRef(null);

    function handleClick() {
        textInput.current.focus();
    }

    return (
        <div>
            <input
                type="text"
                ref={textInput} />
            <input
                type="button"
                value="Focus the text input"
                onClick={handleClick}
            />
        </div>
    );
}









