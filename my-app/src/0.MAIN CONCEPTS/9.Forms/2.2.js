import React, {useState} from 'react';

export function NameForm1() {
    const [data, setData] = useState({value: ''})

    function handleChange(event) {
        setData({value: event.target.value});
    }

    function handleSubmit(event) {
        alert('提交的名字: ' + data.value);
        event.preventDefault();
    }


    return (
        <form onSubmit={handleSubmit}>
            <label>
                名字:
                <input type="text" value={data.value} onChange={handleChange}/>
            </label>
            <input type="submit" value="提交"/>
        </form>
    );
}

















