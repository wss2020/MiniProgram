 // 在 Render 中使用箭头函数

 class Foo extends Component {
     handleClick() {
         console.log('Click happened');
     }
     render() {
         return <button onClick={() => this.handleClick()}>Click Me</button>;
     }
 }


/**
 注意：
 在 render 方法中使用箭头函数也会在每次组件渲染时创建一个新的函数，这会破坏基于恒等比较的性能优化。
 */
























