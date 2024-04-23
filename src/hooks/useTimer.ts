import { useState, useEffect } from "react";

export const useTimer = (initialTimer = 45, changeTeam) => {
    const [timer, setTimer] = useState(initialTimer);
    const [isRunning, setIsRunning] = useState(false);
    const [intervalID, setIntervalID] = useState(0);

    useEffect(() => {
        if (timer > 0 && isRunning) {
            let interval = setTimeout(() => {
                setTimer(timer - 1);
            }, 1000);

            setIntervalID(interval);
        } else if (timer == 0 && isRunning) {
            changeTeam();
        }
    }, [timer, isRunning]);

    const toggleTimer = (runTimer) => {
        setIsRunning(runTimer);
    };

    const resumeTimer = () => {
        setIsRunning(true);
    };

    const stopTimer = () => {
        clearInterval(intervalID);
        setIsRunning(false);
    };

    const resetTimer = () => {
        clearInterval(intervalID);
        setTimer(initialTimer);
    };

    return {
        timer,
        isRunning,
        resumeTimer,
        stopTimer,
        resetTimer,
        toggleTimer,
    };
};
