
/**
 在某些情况下，格式化值的显示可能是一项开销很大的操作。除非需要检查 Hook，否则没有必要这么做。

 因此，useDebugValue 接受一个格式化函数作为可选的第二个参数。该函数只有在 Hook 被检查时才会被调用。
 它接受 debug 值作为参数，并且会返回一个格式化的显示值。

 例如，一个返回 Date 值的自定义 Hook 可以通过格式化函数来避免不必要的 toDateString 函数调用：
 */
import  {useDebugValue,useState} from 'react';
useDebugValue(date, date => date.toDateString());








