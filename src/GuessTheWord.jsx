import { useState, useEffect } from "react";
// import { Timer } from "./components/Timer";
// import { Words } from "./components/Words";

export const GuessTheWord = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const initialTimer = 2;
    const [timer, setTimer] = useState(initialTimer);
    const [isRunning, setIsRunning] = useState(false);
    const [teams, setTeams] = useState(["Team 1", "Team 2"]);
    const [currentTeam, setCurrentTeam] = useState(teams[0]);
    const [turns, setTurns] = useState([1, 2, 3]);
    const [currentTurn, setCurrentTurn] = useState(turns[0]);

    useEffect(() => {
        if (timer > 0 && isRunning) {
            setTimeout(() => {
                setTimer(timer - 1);
            }, 1000);
        } else if (timer == 0 && isRunning) {
            changeTeam();
        }
    }, [timer, isRunning]);

    const toggleTimer = (runTimer) => {
        setIsRunning(runTimer);
    };

    const resetTimer = () => {
        setTimer(initialTimer);
    };

    const currentWord = 0;
    const [words, setWords] = useState([
        "Silent Hill",
        "Dark Souls",
        "Half Life",
    ]);
    const [guessedWords, setGuessedWords] = useState([]);

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

    const initGame = () => {
        setIsPlaying(true);
        setIsRunning(true);
    };

    const stopGame = () => {
        setIsPlaying(false);
        setIsRunning(false);
        setIsRunning(false);
        resetTimer();
    };

    const changeTeam = () => {
        let updatedTeams = [...teams];
        const nextTeam = updatedTeams.shift();

        updatedTeams.push(nextTeam);

        setTeams(updatedTeams);
        setCurrentTeam(updatedTeams[0]);
        stopGame();
    };

    return (
        <>
            <h1>Guess the Word - App</h1>

            <div>
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
                <button onClick={() => toggleTimer(!isRunning)}>
                    {isRunning ? (
                        <span>Stop timer</span>
                    ) : (
                        <span>Start timer</span>
                    )}
                </button>

                <hr />

                {/* Words */}

                <p>{words[currentWord]}</p>

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
