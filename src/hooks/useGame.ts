import { useEffect, useState } from "react";

import { useTimer } from "@/hooks/useTimer";

import { gameRounds, ROUND_1_ID, ENDGAME_ID } from "@/data/rounds";
import { wordsDeck } from "@/data/wordsDeck";
import { gameTeams } from "@/data/teams";

export const useGame = (
    CURRENT_TEAM,
    WAITING_TEAM,
    CURRENT_WORD,
    TOTAL_TIME,
    TOTAL_ROUNDS
) => {
    // Game
    const [isPlaying, setIsPlaying] = useState(false);
    const [ended, setEnded] = useState(false);

    const initGame = () => {
        setIsPlaying(true);
        resumeTimer();
    };

    const stopGame = () => {
        setIsPlaying(false);
        stopTimer();
        resetTimer();
    };

    const endGame = () => {
        stopGame();
        setEnded(true);
    };

    // Teams
    const [teams, setTeams] = useState(gameTeams);
    const [winner, setWinner] = useState(null);

    const changeTeam = () => {
        const [currentTeam, waitingTeam] = teams;

        setTeams([waitingTeam, currentTeam]);
        stopGame();
    };

    const setRoundWinner = () => {
        let winner = CURRENT_TEAM;

        if (teams[CURRENT_TEAM].points < teams[WAITING_TEAM].points) {
            winner = WAITING_TEAM;
        }

        const updatedTeams = [...teams];
        updatedTeams[winner].wonRounds = updatedTeams[winner].wonRounds + 1;

        setTeams(updatedTeams);
    };

    const setGameWinner = () => {
        let winner = CURRENT_TEAM;

        if (teams[CURRENT_TEAM].wonRounds < teams[WAITING_TEAM].wonRounds) {
            winner = WAITING_TEAM;
        }

        setWinner(winner);
    };

    const addPoint = () => {
        const updatedTeams = teams.map((team, i) => {
            if (i === CURRENT_TEAM) team.points++;

            return team;
        });

        setTeams(updatedTeams);
    };

    // Timer
    const { timer, isRunning, resumeTimer, stopTimer, resetTimer } = useTimer(
        TOTAL_TIME,
        changeTeam
    );

    // Words
    const setInitialWords = wordsList => {
        return wordsList[Math.floor(Math.random() * wordsList.length)];
    };

    const [words, setWords] = useState(setInitialWords(wordsDeck));
    const [guessedWords, setGuessedWords] = useState([]);

    useEffect(() => {
        if (isPlaying && !isRunning && timer !== 0) resumeTimer();

        if (!words.length) {
            if (currentRound === TOTAL_ROUNDS) {
                setRoundWinner();
                setGameWinner();
                endGame();
            } else {
                nextRound();
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

    // Rounds
    const [currentRound, setCurrentRound] = useState(gameRounds[ROUND_1_ID]);

    const nextRound = () => {
        if (currentRound.nextRound === ENDGAME_ID) endGame();

        stopGame();
        setRoundWinner();
        changeTeam();
        resetWords();
        setCurrentRound(gameRounds[currentRound.nextRound]);
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
        currentRound,
    };
};
