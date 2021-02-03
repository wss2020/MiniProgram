/**
 使用 Context 之前的考虑

 Context 主要应用场景在于很多不同层级的组件需要访问同样一些的数据。请谨慎使用，因为这会使得组件的复用性变差。

 如果你只是想避免层层传递一些属性，组件组合（component composition）有时候是一个比 context 更好的解决方案。

 比如，考虑这样一个 Page 组件，它层层向下传递 user 和 avatarSize 属性，从而深度嵌套的 Link 和 Avatar 组件可以读取到这些属性：
 */

<Page user={user} avatarSize={avatarSize} />

// ... 渲染出 ...
<PageLayout user={user} avatarSize={avatarSize} />

// ... 渲染出 ...
<NavigationBar user={user} avatarSize={avatarSize} />

// ... 渲染出 ...
<Link href={user.permalink}>
    <Avatar user={user} size={avatarSize} />
</Link>



/**
    如果在最后只有 Avatar 组件真的需要 user 和 avatarSize，那么层层传递这两个 props 就显得非常冗余。而且一旦 Avatar 组件需要更多从来自顶层
 组件的 props，你还得在中间层级一个一个加上去，这将会变得非常麻烦。

 一种无需 context 的解决方案是将 Avatar 组件自身传递下去，因而中间组件无需知道 user 或者 avatarSize 等 props：
 */






