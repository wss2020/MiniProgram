class BBCodeHandler {
    constructor(handler) {
        this.handler = handler;
    }

    onCodeStart(name, value) {
        if (this.handler.onCodeStart != null) {
            this.handler.onCodeStart(name, value);
        }
    }

    onText(text) {
        if (this.handler.onText != null) {
            this.handler.onText(text);
        }
    }

    onCodeEnd(name) {
        if (this.handler.onCodeEnd != null) {
            this.handler.onCodeEnd(name);
        }
    }

    onNewLine() {
        if (this.handler.onNewLine != null) {
            this.handler.onNewLine();
        }
    }
}

//代码开始
let CodeStartStatus = class {
    constructor(text, handler) {
        this.handler = handler;
        this.text = text;
        this.code = "";
        this.equal = false;
    }

    onChar(char) {
        if (char === "/") {
            if (this.code === "") {
                return new CodeEndStatus(this.text, this.handler);
            }
            let text = this.text + "[" + code + "/";
            return new TextStatus(text, this.handler);
        }
        if (char === "]") {
            if (this.code === "") {
                let text = this.text + "[]";
                return new TextStatus(text, this.handler);
            } else {
                this.handler.onText(this.text);
                let parts = this.code.split("=");
                if (parts.length === 2) {
                    this.handler.onCodeStart(parts[0], parts[1]);
                } else {
                    this.handler.onCodeStart(parts[0], null);
                }
                return new TextStatus("", this.handler);
            }
        }
        if (char === "\n") {
            let text = this.text + "[" + this.code;
            this.handler.onText(text);
            this.handler.onNewLine();
            return new TextStatus("", this.handler);
        }
        if (char === "[") {
            this.text = this.text + "[" + this.code;
            this.code = "";
            this.equal = false;
            return null;
        }
        if (char === "=") {
            if (this.equal) {
                let text = this.text + "[" + this.code + "=";
                return new TextStatus(text, this.handler);
            } else {
                this.equal = true;
            }
        }
        this.code = this.code + char;
        return null;
    }

    onEnd() {
        this.handler.onText(this.text + "[" + this.code);
    }
};

//代码结束
let CodeEndStatus = class {
    constructor(text, handler) {
        this.handler = handler;
        this.text = text;
        this.code = "";
    }

    onChar(char) {
        if (char === "/" || this.text === "[" || (char === "]" && this.code === "")) {
            let text = this.text + "[/" + this.code + char;
            return new TextStatus(text, this.handler);
        }
        if (char === '\n') {
            let text = this.text + "[/" + this.code;
            this.handler.onText(text);
            this.handler.onNewLine();
            return new TextStatus("", this.handler);
        }
        if (char === "]") {
            this.handler.onText(this.text);
            this.handler.onCodeEnd(this.code);
            return new TextStatus("", this.handler);
        }
        this.code = this.code + char;
        return null;
    }

    onEnd() {
        this.handler.onText(this.text + "[/" + this.code);
    }
};

//文字
let TextStatus = class {
    constructor(text, handler) {
        this.handler = handler;
        this.text = text;
    }

    onChar(char) {
        if (char === "[") {
            return new CodeStartStatus(this.text, this.handler);
        }
        if(char === "\n") {
            this.handler.onText(this.text);
            this.handler.onNewLine();
            return new TextStatus("", this.handler);
        }
        this.text = this.text + char;
        return null;
    }

    onEnd() {
        if (this.text !== "") {
            this.handler.onText(this.text);
        }
    }
};

let BBCode = class {
    constructor(handler) {
        this.status = new TextStatus("", new BBCodeHandler(handler));
    }

    parse(code) {
        for (var i = 0; i < code.length; i++) {
            let status = this.status.onChar(code[i]);
            if (status != null) {
                this.status = status;
            }
        }
        this.status.onEnd();
    }
};

module.exports = BBCode;