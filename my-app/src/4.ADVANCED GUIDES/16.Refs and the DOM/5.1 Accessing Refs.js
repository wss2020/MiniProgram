//访问 Refs

// 当 ref 被传递给 render 中的元素时，对该节点的引用可以在 ref 的 current 属性中被访问。
const node = this.myRef.current;

/**
 ref 的值根据节点的类型而有所不同：
     1.当 ref 属性用于 HTML 元素时，构造函数中使用 React.createRef() 创建的 ref 接收底层 DOM 元素作为其 current 属性。
     2.当 ref 属性用于自定义 class 组件时，ref 对象接收组件的挂载实例作为其 current 属性。
     3.你不能在函数组件上使用 ref 属性，因为他们没有实例。

 以下例子说明了这些差异。
 */








