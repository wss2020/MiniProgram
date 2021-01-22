import React, {useState} from 'react';

export function FlavorForm() {
    const [data, setData] = useState({value: 'coconut'});

    function handleChange(event) {
        setData({value: event.target.value});
    }

    function handleSubmit(event) {
        alert('你喜欢的风味是: ' + data.value);
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                选择你喜欢的风味:
                <select value={data.value} onChange={handleChange}>
                    <option value="grapefruit">葡萄柚</option>
                    <option value="lime">酸橙</option>
                    <option value="coconut">椰子</option>
                    <option value="mango">芒果</option>
                </select>
            </label>
            <input type="submit" value="提交"/>
        </form>
    );
}





























