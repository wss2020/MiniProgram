/**
 无障碍表单

 标记
 所有的 HTML 表单控制，例如 <input> 和 <textarea> ，都需要被标注来实现无障碍辅助功能。我们需要提供屏幕朗读器以解释性标注。

 以下资源向我们展示了如何写标注：
     W3C 向我们展示如何标注元素
     WebAIM 向我们展示如何标注元素
     Paciello Group 解释什么是无障碍名称

 尽管这些标准 HTML 实践可以被直接用在 React 中，请注意 for 在 JSX 中应该被写作 htmlFor：
 */
<label htmlFor="namedInput">Name:</label>
<input id="namedInput" type="text" name="name"/>


/**
 在出错时提醒用户
 当出现错误时，所有用户都应该知情。下面的链接告诉我们如何给屏幕朗读器设置错误信息：

 W3C 展示用户推送
 WebAIM 关于表单校验的文章
 */
