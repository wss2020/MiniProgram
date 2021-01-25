import React, {useState, useEffect} from "react";

export function Reservation() {

    const [isGoing, setIsGoing] = useState(true);
    const [numberOfGuests, setNumberOfGuests] = useState(2);

    function handleInputChange(event) {
        const target = event.target;

        if (target.type === "checkbox") setIsGoing(target.checked)
        else setNumberOfGuests(target.value)
    }

    return (
        <form>
            <div>check 为 {isGoing ? 'true' : 'false'} ~~~ 值为 {numberOfGuests}</div>
            <br/>
            <label>
                参与:
                <input
                    name="isGoing"
                    type="checkbox"
                    checked={isGoing}
                    onChange={handleInputChange}/>
            </label>
            <br/>
            <label>
                来宾人数:
                <input
                    name="numberOfGuests"
                    type="number"
                    value={numberOfGuests}
                    onChange={handleInputChange}/>
            </label>
        </form>
    );
}




