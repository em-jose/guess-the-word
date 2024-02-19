import { useState, useEffect } from "react";
// import { Timer } from "./components/Timer";
// import { Words } from "./components/Words";

export const GuessTheWord = () => {
    // Game
    const [isPlaying, setIsPlaying] = useState(false);

    const initGame = () => {
        setIsPlaying(true);
        setIsRunning(true);
    };

    const stopGame = () => {
        setIsPlaying(false);
        setIsRunning(false);
        setIsRunning(false);
        stopTimer();
        resetTimer();
    };

    // Timer
    const initialTimer = 45;
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

    // Words
    const currentWord = 0;
    const [words, setWords] = useState([
        "Silent Hill",
        "Dark Souls",
        "Half Life",
    ]);
    const [guessedWords, setGuessedWords] = useState([]);

    useEffect(() => {
        if (!words.length) {
            nextTurn();
        }
    }, [words]);

    const wordIsCorrect = () => {
        const updatedWords = [...words];
        const guessedWord = updatedWords.splice(currentWord, 1)[0];
        let updatedGuessedWords = [...guessedWords];

        updatedGuessedWords.push(guessedWord);

        setWords(updatedWords);
        setGuessedWords(updatedGuessedWords);

        if (!updatedWords.length) {
            stopGame();
            return false;
        }
    };

    const wordIsNotCorrect = () => {
        if (!words.length) return false;

        let updatedWords = [...words];
        const incorrectWord = updatedWords.shift();

        updatedWords.push(incorrectWord);

        setWords(updatedWords);
    };

    // Teams
    const [teams, setTeams] = useState(["Team 1", "Team 2"]);
    const [currentTeam, setCurrentTeam] = useState(teams[0]);

    const changeTeam = () => {
        let updatedTeams = [...teams];
        const nextTeam = updatedTeams.shift();

        updatedTeams.push(nextTeam);

        setTeams(updatedTeams);
        setCurrentTeam(updatedTeams[0]);
        stopGame();
    };

    // Turn
    const totalTurns = 3;
    const [currentTurn, setCurrentTurn] = useState(1);

    const nextTurn = () => {
        if (currentTurn == totalTurns) return false;

        stopGame();
        changeTeam();
        setCurrentTurn(currentTurn + 1);
    };

    return (
        <>
            <h1>Guess the Word - App</h1>

            <div>
                {/* Turn */}
                Turn: {currentTurn}
                <hr />
                {/* Team */}
                {currentTeam}
                <hr />
                {/* Play */}
                {JSON.stringify(isPlaying)}
                <br />
                <br />
                <div>
                    <button onClick={initGame}>Play!</button>
                </div>
                <hr />
                {/* Timer */}
                <h2>{timer}</h2>
                <button onClick={stopTimer}>
                    <span>Stop timer</span>
                </button>
                <button onClick={resumeTimer}>
                    <span>Resume timer</span>
                </button>
                <hr />
                {/* Words */}
                <p>{words[currentWord]}</p>
                <p>{JSON.stringify(words)}</p>
                <p>{JSON.stringify(guessedWords)}</p>
                {words.length && (
                    <div>
                        <button onClick={wordIsCorrect}>Correct!</button>
                        <button onClick={wordIsNotCorrect}>Incorrect</button>
                    </div>
                )}
            </div>
        </>
    );
};
