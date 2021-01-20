/**
 组合组件

    组件可以在其输出中引用其他组件。这就可以让我们用同一组件来抽象出任意层次的细节。按钮，表单，对话框，甚至整个屏幕的内容：
 在 React 应用程序中，这些通常都会以组件的形式表示。
 */

// 例如，我们可以创建一个可以多次渲染 Welcome 组件的 App 组件：

function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}

function App() {
    return (
        <div>
            <Welcome name="Sara" />
            <Welcome name="Cahal" />
            <Welcome name="Edite" />
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

/**
    通常来说，每个新的 React 应用程序的顶层组件都是 App 组件。但是，如果你将 React 集成到现有的应用程序中，你可能需要
 使用像 Button 这样的小组件，并自下而上地将这类组件逐步应用到视图层的每一处。
 */











