import { useState, useEffect } from "react";
import { Fullscreen } from "./Fullscreen";
import { GameInfo } from "./GameInfo";
import { EndGame } from "./EndGame";
import { Timer } from "./Timer";
import { Words } from "./Words";
import { PlayingTeam } from "./PlayingTeam";
import { PlayButton } from "./PlayButton";
import { useTimer } from "../hooks/useTimer";

export const GuessTheWord = () => {
    // Game
    const [isPlaying, setIsPlaying] = useState(false);
    const [ended, setEnded] = useState(false);

    const initGame = () => {
        setIsPlaying(true);
        toggleTimer(true);
    };

    const stopGame = () => {
        setIsPlaying(false);
        toggleTimer(false);
        stopTimer();
        resetTimer();
    };

    const endGame = () => {
        stopGame();
        setEnded(true);
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

    // Timer
    const {
        timer,
        isRunning,
        resumeTimer,
        stopTimer,
        resetTimer,
        toggleTimer,
    } = useTimer(45, changeTeam);

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
        <div className="p-5 bg-amber-50">
            <header>
                <h1 className="title">Guess the Word!</h1>

                {/* <Fullscreen /> */}
            </header>

            <main>
                {ended ? (
                    <EndGame
                        winnerName={teams[winner].name}
                        winnerPoints={teams[winner].points}
                        winnerTurns={teams[winner].wonTurns}
                    />
                ) : (
                    <div>
                        {isPlaying ? (
                            <div>
                                <PlayingTeam
                                    teamName={teams[currentTeam].name}
                                />

                                <Timer
                                    timer={timer}
                                    isRunning={isRunning}
                                    stopTimer={stopTimer}
                                    resumeTimer={resumeTimer}
                                />

                                <Words
                                    words={words}
                                    currentWord={currentWord}
                                    wordIsCorrect={wordIsCorrect}
                                    wordIsNotCorrect={wordIsNotCorrect}
                                />
                            </div>
                        ) : (
                            <div className="flex justify-center items-center flex-col">
                                <GameInfo
                                    currentTurn={currentTurn}
                                    teams={teams}
                                    remainingWords={words.length}
                                    currentTeam={currentTeam}
                                />

                                <PlayButton initGame={initGame} />
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};
