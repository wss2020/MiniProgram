/**
 三目运算符

 另一种内联条件渲染的方法是使用 JavaScript 中的三目运算符 condition ? true : false。

 在下面这个示例中，我们用它来条件渲染一小段文本
 */

render() {
    const isLoggedIn = this.state.isLoggedIn;
    return (
        <div>
            The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
        </div>
    );
}


// 同样的，它也可以用于较为复杂的表达式中，虽然看起来不是很直观：
render() {
    const isLoggedIn = this.state.isLoggedIn;
    return (
        <div>
            {isLoggedIn
                ? <LogoutButton onClick={this.handleLogoutClick} />
                : <LoginButton onClick={this.handleLoginClick} />
            }
        </div>
    );
}


// 就像在 JavaScript 中一样，你可以根据团队的习惯来选择可读性更高的代码风格。
// 需要注意的是，如果条件变得过于复杂，那你应该考虑如何提取组件。

















