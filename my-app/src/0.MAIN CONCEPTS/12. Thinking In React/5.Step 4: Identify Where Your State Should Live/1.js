/**
 第四步：确定 state 放置的位置

 我们已经确定了应用所需的 state 的最小集合。接下来，我们需要确定哪个组件能够改变这些 state，或者说拥有这些 state。

    注意：React 中的数据流是单向的，并顺着组件层级从上往下传递。哪个组件应该拥有某个 state 这件事，对初学者来说往往
 是最难理解的部分。尽管这可能在一开始不是那么清晰，但你可以尝试通过以下步骤来判断：

 对于应用中的每一个 state：
     1.找到根据这个 state 进行渲染的所有组件。
     2.找到他们的共同所有者（common owner）组件（在组件层级上高于所有需要该 state 的组件）。
     3.该共同所有者组件或者比它层级更高的组件应该拥有该 state。
     4.如果你找不到一个合适的位置来存放该 state，就可以直接创建一个新的组件来存放该 state，并将这一新组件置于高于共同所有者组件层级的位置。


 根据以上策略重新考虑我们的示例应用：
     1.ProductTable 需要根据 state 筛选产品列表。SearchBar 需要展示搜索词和复选框的状态。
     2.他们的共同所有者是 FilterableProductTable。
     3.因此，搜索词和复选框的值应该很自然地存放在 FilterableProductTable 组件中。

    很好，我们已经决定把这些 state 存放在 FilterableProductTable 组件中。首先，将实例属性
 this.state = {filterText: '', inStockOnly: false} 添加到 FilterableProductTable
 的 constructor 中，设置应用的初始 state；接着，将 filterText 和 inStockOnly 作为 props
 传入 ProductTable 和 SearchBar；最后，用这些 props 筛选 ProductTable 中的产品信息，并设
 置 SearchBar 的表单值。

 你现在可以看到应用的变化了：将 filterText 设置为 "ball" 并刷新应用，你能发现表格中的数据已经更新了。
 */
