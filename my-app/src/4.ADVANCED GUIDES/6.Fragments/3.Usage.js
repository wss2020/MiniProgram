// 用法
class Columns extends React.Component {
    render() {
        return (
            <React.Fragment>
                <td>Hello</td>
                <td>World</td>
            </React.Fragment>
        );
    }
}

// 这样可以正确的输出 <Table />：
<table>
    <tr>
        <td>Hello</td>
        <td>World</td>
    </tr>
</table>









