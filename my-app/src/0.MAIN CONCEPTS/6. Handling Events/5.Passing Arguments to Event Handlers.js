/**
 向事件处理程序传递参数

 在循环中，通常我们会为事件处理函数传递额外的参数。例如，若 id 是你要删除那一行的 ID，
 以下两种方式都可以向事件处理函数传递参数：
 */

<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>


/**
 上述两种方式是等价的，分别通过箭头函数和 Function.prototype.bind 来实现。

    在这两种情况下，React 的事件对象 e 会被作为第二个参数传递。如果通过箭头函数的方式，
 事件对象必须显式的进行传递，而通过 bind 的方式，事件对象以及更多的参数将会被隐式的进行传递。
 */





