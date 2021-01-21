 // 如果觉得使用 bind 很麻烦，这里有两种方式可以解决。

 //1
 // 如果你正在使用实验性的 public class fields 语法，你可以使用 class fields 正确的绑定回调函数：
 //Create React App 默认启用此语法。
 class LoggingButton extends React.Component {
     // 此语法确保 `handleClick` 内的 `this` 已被绑定。
     // 注意: 这是 *实验性* 语法。
     handleClick = () => {
         console.log('this is:', this);
     }

     render() {
         return (
             <button onClick={this.handleClick}>
                 Click me
             </button>
         );
     }
 }



// 2 如果你没有使用 class fields 语法，你可以在回调中使用箭头函数：
 class LoggingButton extends React.Component {
     handleClick() {
         console.log('this is:', this);
     }

     render() {
         // 此语法确保 `handleClick` 内的 `this` 已被绑定。
         return (
             <button onClick={() => this.handleClick()}>
                 Click me
             </button>
         );
     }
 }

 /**
    此语法问题在于每次渲染 LoggingButton 时都会创建不同的回调函数。在大多数情况下，这没什么问题，
  但如果该回调函数作为 prop 传入子组件时，这些组件可能会进行额外的重新渲染。我们通常建议在构造器中绑定
  或使用 class fields 语法来避免这类性能问题。
  */










