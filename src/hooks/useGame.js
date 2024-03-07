import { useEffect, useState } from "react";
import { useTimer } from "./useTimer";
import { wordsDeck } from "../utils/wordsDeck";

export const useGame = (CURRENT_TEAM, WAITING_TEAM, CURRENT_WORD) => {
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
    const [winner, setWinner] = useState(CURRENT_TEAM);

    const changeTeam = () => {
        const [currentTeam, waitingTeam] = teams;

        setTeams([waitingTeam, currentTeam]);
        stopGame();
        wordIsNotCorrect();
    };

    const setTurnWinner = () => {
        let winner = CURRENT_TEAM;

        if (teams[CURRENT_TEAM].points < teams[WAITING_TEAM].points) {
            winner = WAITING_TEAM;
        }

        const updatedTeams = [...teams];
        updatedTeams[winner].wonTurns = updatedTeams[winner].wonTurns + 1;

        setTeams(updatedTeams);
    };

    const setGameWinner = () => {
        let winner = CURRENT_TEAM;

        if (teams[CURRENT_TEAM].wonTurns < teams[WAITING_TEAM].wonTurns) {
            winner = WAITING_TEAM;
        }

        setWinner(winner);
    };

    const addPoint = () => {
        const updatedTeams = [...teams];
        updatedTeams[CURRENT_TEAM].points =
            updatedTeams[CURRENT_TEAM].points + 1;

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
    const setInitialWords = wordsList => {
        return wordsList[Math.floor(Math.random() * wordsList.length)];
    };

    const [words, setWords] = useState(setInitialWords(wordsDeck));
    const [guessedWords, setGuessedWords] = useState([]);

    useEffect(() => {
        if (!words.length) {
            if (currentTurn === totalTurns) {
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
        const guessedWord = updatedWords.splice(CURRENT_WORD, 1)[0];
        const updatedGuessedWords = [...guessedWords];

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

        const updatedWords = [...words];
        const incorrectWord = updatedWords.shift();

        updatedWords.push(incorrectWord);

        setWords(updatedWords);
    };

    const resetWords = () => {
        const updatedGuessedWords = [...guessedWords];
        const shuffledWords = shuffleWords(updatedGuessedWords);

        setWords(shuffledWords);
        setGuessedWords([]);
    };

    const shuffleWords = words => {
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
        if (currentTurn === totalTurns) return false;

        stopGame();
        setTurnWinner();
        changeTeam();
        resetWords();
        setCurrentTurn(currentTurn + 1);
    };

    return {
        isPlaying,
        ended,
        initGame,
        teams,
        winner,
        timer,
        isRunning,
        resumeTimer,
        stopTimer,
        words,
        wordIsCorrect,
        wordIsNotCorrect,
        currentTurn,
    };
};
