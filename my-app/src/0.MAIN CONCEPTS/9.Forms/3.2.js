import React, {useState} from 'react';

export function EssayForm() {

    const [data, setData] = useState({value: '请撰写一篇关于你喜欢的 DOM 元素的文章.'});

    function handleChange(event) {
        setData({value: event.target.value});
    }

    function handleSubmit(event) {
        alert('提交的文章: ' + data.value);
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                文章:
                <textarea value={data.value} onChange={handleChange}/>
            </label>
            <input type="submit" value="提交"/>
        </form>
    );
}




































