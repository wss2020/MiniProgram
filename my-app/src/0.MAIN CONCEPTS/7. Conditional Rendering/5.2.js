import {useState, useEffect} from "react";

function WarningBanner(props) {
    if (!props.warn) return null;
    return (
        <div className="warning"> Warning! </div>
    );
}


export function Page() {
    const [showWarning, setShowWarning] = useState(true);

    function handleToggleClick() {
        setShowWarning(!showWarning);
    }

    return (
        <div>
            <WarningBanner warn={showWarning}/>
            <button onClick={handleToggleClick}>
                {showWarning ? 'Hide' : 'Show'}
            </button>
        </div>
    );
}






