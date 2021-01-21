import ReactDOM from 'react-dom';
import React, {useState} from 'react';


function Toggle(){

    const [isToggleOn, setIsToggleOn] = useState(false);
    function handleClick(){
        setIsToggleOn( !isToggleOn);
    }
    return (
        <button onClick={handleClick}>
            {isToggleOn ? 'ON' : 'OFF'}
        </button>
    );
}


ReactDOM.render(
    <Toggle />,
    document.getElementById('root')
);


