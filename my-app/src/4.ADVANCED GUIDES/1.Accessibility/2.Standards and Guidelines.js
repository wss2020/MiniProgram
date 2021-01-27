/**
 标准和指南
 WCAG
 网络内容无障碍指南（Web Content Accessibility Guidelines，WCAG） 为开发无障碍网站提供了指南。

 下面的 WCAG 检查表提供了一些概览：

 Wuhcag 提供的 WCAG 检查表（WCAG checklist from Wuhcag）
 WebAIM 提供的 WCAG 检查表（WCAG checklist from WebAIM）
 A11Y Project 提供的检查表（Checklist from The A11Y Project）
 WAI-ARIA
 网络无障碍倡议 - 无障碍互联网应用（Web Accessibility Initiative - Accessible Rich Internet Applications） 文件包含了创建完全无障碍 JavaScript 部件所需要的技术。

 注意：JSX 支持所有 aria-* HTML 属性。虽然大多数 React 的 DOM 变量和属性命名都使用驼峰命名（camelCased），但 aria-* 应该像其在 HTML 中一样使用带连字符的命名法（也叫诸如 hyphen-cased，kebab-case，lisp-case)。
 */

<input
    type="text"
    aria-label={labelText}
    aria-required="true"
    onChange={onchangeHandler}
    value={inputValue}
    name="name"
/>
