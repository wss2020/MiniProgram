import React, {useState} from "react";
import {toCelsius, toFahrenheit, tryConvert} from './tryConvert';
import {BoilingVerdict} from './BoilingVerdict';
import {TemperatureInput} from './TemperatureInput';

export function Calculator() {
    const [temperature, setTemperature] = useState('');
    const [scale, setScale] = useState('c');

    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    function handleChange(e,type) {
       const value = type === 'Celsius' ? 'c' : 'f';
       setScale(value);
       setTemperature(e);
    }

    return (
        <div>
            <TemperatureInput
                scale="c"
                temperature={celsius}
                onTemperatureChange={(e)=> handleChange(e,'Celsius')}/>
            <TemperatureInput
                scale="f"
                temperature={fahrenheit}
                onTemperatureChange={(e)=> handleChange(e,'Fahrenheit')}/>
            <BoilingVerdict
                celsius={parseFloat(celsius)}/>
        </div>
    );
}



















