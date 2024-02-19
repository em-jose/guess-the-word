import { useState, useEffect } from "react";

export const Timer = ({ initialTimer }) => {
    const [timer, setTimer] = useState(initialTimer);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        if (timer > 0 && isRunning) {
            setTimeout(() => {
                setTimer(timer - 1);
            }, 1000);
        }
    }, [timer, isRunning]);

    const toggleTimer = (runTimer) => {
        setIsRunning(runTimer);
    };

    const resetTimer = () => {
        setTimer(initialTimer);
    };

    return (
        <>
            <h1>{timer}</h1>
            <button onClick={() => toggleTimer(!isRunning)}>
                {isRunning ? <span>Stop timer</span> : <span>Start timer</span>}
            </button>

            <button onClick={resetTimer}>Reset timer</button>
        </>
    );
};
