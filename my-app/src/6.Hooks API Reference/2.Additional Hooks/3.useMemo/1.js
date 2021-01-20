import  {useMemo} from 'react';


const memoizedValue = useMemo(
    () => computeExpensiveValue(a, b), [a, b]
);


/**
 返回一个 memoized 值。

    把“创建”函数和依赖项数组作为参数传入 useMemo，它仅会在某个依赖项改变时才重新计算 memoized 值。
 这种优化有助于避免在每次渲染时都进行高开销的计算。

    记住，传入 useMemo 的函数会在渲染期间执行。请不要在这个函数内部执行与渲染无关的操作，诸如副作用这类的
 操作属于 useEffect 的适用范畴，而不是 useMemo。

    如果没有提供依赖项数组，useMemo 在每次渲染时都会计算新的值。

    你可以把 useMemo 作为性能优化的手段，但不要把它当成语义上的保证。将来，React 可能会选择“遗忘”以前的一些
 memoized 值，并在下次渲染时重新计算它们，比如为离屏组件释放内存。先编写在没有 useMemo 的情况下也可以执行的
 代码 —— 之后再在你的代码中添加 useMemo，以达到优化性能的目的。



 注意
    依赖项数组不会作为参数传给“创建”函数。虽然从概念上来说它表现为：所有“创建”函数中引用的值都应该出现在依赖项数组中。
 未来编译器会更加智能，届时自动创建数组将成为可能。
    我们推荐启用 eslint-plugin-react-hooks 中的 exhaustive-deps 规则。此规则会在添加错误依赖时发出警告并给出修复建议。
 */
