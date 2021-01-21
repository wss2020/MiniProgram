
import ReactDOM from 'react-dom';
import React, {useState, useEffect} from 'react';

function Clock() {
    const [date, setDate] = useState(new Date());
    let timerID = null;

    useEffect(() => {
        timerID = setInterval(
            () => setDate(new Date()),
            1000
        );
        return () => {
            console.log('1dddd');
            clearInterval(timerID);
        };
    });

    return (
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {date.toLocaleTimeString()}.</h2>
        </div>
    );

}

ReactDOM.render(
    <Clock/>,
    document.getElementById('root')
);













