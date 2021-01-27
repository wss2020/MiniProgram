
import React from 'react';
class CustomTextInput extends React.Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
    }

    getFocus() {
        this.textInput.current.focus();
    }

    render() {
        return (
            <div>
                <input
                    type="text"
                    ref={this.textInput} />
            </div>
        );
    }
}



export class AutoFocusTextInput extends React.Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
    }

    componentDidMount() {
        this.textInput.current.getFocus();
    }

    render() {
        return (
            <CustomTextInput ref={this.textInput} />
        );
    }
}








