import { useState, useEffect } from "react";
// import { Timer } from "./components/Timer";
// import { Words } from "./components/Words";

export const GuessTheWord = () => {
    // Game
    const [isPlaying, setIsPlaying] = useState(false);
    const [ended, setEnded] = useState(false);

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

    const endGame = () => {
        stopGame();
        setEnded(true);
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
            if (currentTurn == totalTurns) {
                setTurnWinner();
                setGameWinner();
                endGame();
            } else {
                nextTurn();
            }
        }
    }, [words]);

    const wordIsCorrect = () => {
        const updatedWords = [...words];
        const guessedWord = updatedWords.splice(currentWord, 1)[0];
        let updatedGuessedWords = [...guessedWords];

        updatedGuessedWords.push(guessedWord);

        setWords(updatedWords);
        setGuessedWords(updatedGuessedWords);
        addPoint();

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

    const resetWords = () => {
        let updatedGuessedWords = [...guessedWords];
        const shuffledWords = shuffleWords(updatedGuessedWords);

        setWords(shuffledWords);
        setGuessedWords([]);
    };

    const shuffleWords = (words) => {
        for (let i = words.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [words[i], words[j]] = [words[j], words[i]];
        }

        return words;
    };

    // Teams
    const [teams, setTeams] = useState([
        { name: "Team 1", points: 0, wonTurns: 0 },
        { name: "Team 2", points: 0, wonTurns: 0 },
    ]);
    const currentTeam = 0;
    const waitingTeam = 1;
    const [winner, setWinner] = useState(currentTeam);

    const changeTeam = () => {
        let updatedTeams = [...teams];
        const nextTeam = updatedTeams.shift();

        updatedTeams.push(nextTeam);

        setTeams(updatedTeams);
        stopGame();
        wordIsNotCorrect();
    };

    const setTurnWinner = () => {
        let winner = currentTeam;

        if (teams[currentTeam].points < teams[waitingTeam].points) {
            winner = waitingTeam;
        }

        let updatedTeams = [...teams];
        updatedTeams[winner].wonTurns = updatedTeams[winner].wonTurns + 1;

        setTeams(updatedTeams);
    };

    const setGameWinner = () => {
        let winner = currentTeam;

        if (teams[currentTeam].wonTurns < teams[waitingTeam].wonTurns) {
            winner = waitingTeam;
        }

        setWinner(winner);
    };

    const addPoint = () => {
        let updatedTeams = [...teams];
        updatedTeams[currentTeam].points = updatedTeams[currentTeam].points + 1;

        setTeams(updatedTeams);
    };

    // Turn
    const totalTurns = 3;
    const [currentTurn, setCurrentTurn] = useState(1);

    const nextTurn = () => {
        if (currentTurn == totalTurns) return false;

        stopGame();
        setTurnWinner();
        changeTeam();
        resetWords();
        setCurrentTurn(currentTurn + 1);
    };

    return (
        <>
            <h1>Guess the Word - App</h1>

            {/* Info */}
            <div>
                <ul>
                    <li>Turn: {currentTurn}</li>
                    <li>Current team: {teams[currentTeam].name}</li>
                    <li>{JSON.stringify(teams)}</li>
                    <li>Is playing: {JSON.stringify(isPlaying)}</li>
                    <li>Timer: {timer}</li>
                    <li>Current word: {words[currentWord]}</li>
                    <li>Words: {JSON.stringify(words)}</li>
                    <li>Guessed words: {JSON.stringify(guessedWords)}</li>
                    <li>Remaining words: {words.length}</li>
                </ul>
            </div>

            {/*  */}
            <div>
                <ul>
                    <li>Turn: {currentTurn}</li>
                    {teams.map((team, i) => (
                        <li
                            key={i}
                            className={`${
                                i == currentTeam ? "current-team" : ""
                            }`}
                        >
                            <span>
                                {team.name} (Points: {team.points}, Won turns:
                                {team.wonTurns})
                            </span>
                        </li>
                    ))}
                    <li>Remaining words: {words.length}</li>
                </ul>
            </div>

            {/*  */}
            <div>
                {ended ? (
                    <div>
                        <p>GAME ENDED</p>
                        <p>Winner: {teams[winner].name}</p>
                        <p>Winner points: {teams[winner].points}</p>
                        <p>Winner won turns: {teams[winner].wonTurns}</p>
                    </div>
                ) : (
                    <div>
                        {isPlaying ? (
                            <div>
                                <h2>{timer}</h2>
                                <button onClick={stopTimer}>
                                    <span>Stop timer</span>
                                </button>
                                <button onClick={resumeTimer}>
                                    <span>Resume timer</span>
                                </button>
                                <p>{words[currentWord]}</p>
                                {words.length && (
                                    <div>
                                        <button onClick={wordIsCorrect}>
                                            Correct!
                                        </button>
                                        <button onClick={wordIsNotCorrect}>
                                            Incorrect
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div>
                                <button onClick={initGame}>Play!</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};
