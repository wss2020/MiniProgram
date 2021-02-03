

//  一种无需 context 的解决方案是将 Avatar 组件自身传递下去，因而中间组件无需知道 user 或者 avatarSize 等 props：
function Page(props) {
    const user = props.user;
    const userLink = (
        <Link href={user.permalink}>
            <Avatar user={user} size={props.avatarSize} />
        </Link>
    );
    return <PageLayout userLink={userLink} />;
}

// 现在，我们有这样的组件：
<Page user={user} avatarSize={avatarSize} />
// ... 渲染出 ...
<PageLayout userLink={...} />
// ... 渲染出 ...
<NavigationBar userLink={...} />
// ... 渲染出 ...
{props.userLink}



/**
    这种变化下，只有最顶部的 Page 组件需要知道 Link 和 Avatar 组件是如何使用 user 和 avatarSize 的。

    这种对组件的控制反转减少了在你的应用中要传递的 props 数量，这在很多场景下会使得你的代码更加干净，使你对根组件有更多的把控。但是，这并不适用于
 每一个场景：这种将逻辑提升到组件树的更高层次来处理，会使得这些高层组件变得更复杂，并且会强行将低层组件适应这样的形式，这可能不会是你想要的。

    而且你的组件并不限制于接收单个子组件。你可能会传递多个子组件，甚至会为这些子组件（children）封装多个单独的“接口（slots）”，
 正如这里的文档所列举的
 */
function Page(props) {
    const user = props.user;
    const content = <Feed user={user} />;
    const topBar = (
        <NavigationBar>
            <Link href={user.permalink}>
                <Avatar user={user} size={props.avatarSize} />
            </Link>
        </NavigationBar>
    );
    return (
        <PageLayout
            topBar={topBar}
            content={content}
        />
    );
}

/**
    这种模式足够覆盖很多场景了，在这些场景下你需要将子组件和直接关联的父组件解耦。如果子组件需要在渲染前和父组件进行一些交流，你可以进一步使用
 render props。

    但是，有的时候在组件树中很多不同层级的组件需要访问同样的一批数据。Context 能让你将这些数据向组件树下所有的组件进行“广播”，所有的组件都能
 访问到这些数据，也能访问到后续的数据更新。使用 context 的通用的场景包括管理当前的 locale，theme，或者一些缓存数据，这比替代方案要简单的多。
 */














