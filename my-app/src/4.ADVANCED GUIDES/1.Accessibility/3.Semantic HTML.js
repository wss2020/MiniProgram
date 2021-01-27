/**
 语义化的 HTML

 语义化的 HTML 是无障碍辅助功能网络应用的基础。 利用多种 HTML 元素来强化您网站中的信息通常可以使您直接获得无障碍辅助功能。

 MDN 的 HTML 元素参照（MDN HTML elements reference）
    有时，语义化的 HTML 会被破坏。比如当在 JSX 中使用 <div> 元素来实现 React 代码功能的时候，又或是在使用列表（<ol>， <ul> 和 <dl>）和
 HTML <table> 时。 在这种情况下，我们应该使用 React Fragments 来组合各个组件。

 举个例子，
 */
import React, { Fragment } from 'react';

function ListItem({ item }) {
    return (
        <Fragment>
            <dt>{item.term}</dt>
            <dd>{item.description}</dd>
        </Fragment>
    );
}

function Glossary(props) {
    return (
        <dl>
            {props.items.map(item => (
                <ListItem item={item} key={item.id} />
            ))}
        </dl>
    );
}

// 和其他的元素一样，你可以把一系列的对象映射到一个 fragment 的数组中。
function Glossary(props) {
    return (
        <dl>
            {props.items.map(item => (
                // Fragments should also have a `key` prop when mapping collections
                <Fragment key={item.id}>
                    <dt>{item.term}</dt>
                    <dd>{item.description}</dd>
                </Fragment>
            ))}
        </dl>
    );
}

// 当你不需要在 fragment 标签中添加任何 prop 且你的工具支持的时候，你可以使用 短语法：
function ListItem({ item }) {
    return (
        <>
            <dt>{item.term}</dt>
            <dd>{item.description}</dd>
        </>
    );
}

























