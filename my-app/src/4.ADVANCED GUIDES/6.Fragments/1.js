/**
 Fragments
 React 中的一个常见模式是一个组件返回多个元素。Fragments 允许你将子列表分组，而无需向 DOM 添加额外节点。
 */

function render() {
    return (
        <React.Fragment>
            <ChildA />
            <ChildB />
            <ChildC />
        </React.Fragment>
    );
}
// 还有一种新的短语法可用于声明它们。 在下边

