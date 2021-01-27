//动机

// 一种常见模式是组件返回一个子元素列表。以此 React 代码片段为例
class Table extends React.Component {
    render() {
        return (
            <table>
                <tr>
                    <Columns />
                </tr>
            </table>
        );
    }
}

// <Columns /> 需要返回多个 <td> 元素以使渲染的 HTML 有效。  如果在 <Columns /> 的 render() 中使用了父 div，则生成的 HTML 将无效。
class Columns extends React.Component {
    render() {
        return (
            <div>
                <td>Hello</td>
                <td>World</td>
            </div>
        );
    }
}

// 得到一个 <Table /> 输出：
<table>
    <tr>
        <div>
            <td>Hello</td>
            <td>World</td>
        </div>
    </tr>
</table>

// Fragments 解决了这个问题。



