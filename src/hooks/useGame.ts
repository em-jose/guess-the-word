import { useEffect, useState } from "react";

import { useTimer } from "@/hooks/useTimer";

import { ROUND_1_ID, ENDGAME_ID, gameRounds } from "@/data/rounds";
import { wordsDeck } from "@/data/wordsDeck";
import { gameTeams } from "@/data/teams";

export const useGame = (CURRENT_WORD: number, TOTAL_TIME: number) => {
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
    const [playingTeam, setPlayingTeam] = useState(gameTeams[0]);

    const setRoundPlayingTeam = (teamId): void => {
        const updatedRound = { ...currentRound };
        const nextTeam = gameTeams.find(team => team.id === teamId);

        setPlayingTeam(nextTeam);
    };

    const findNextTeam = () => {
        const currentTeamIndex = gameTeams.findIndex(
            team => team.id === playingTeam.id
        );
        const nextTeamIndex =
            gameTeams.length - 1 === currentTeamIndex
                ? 0
                : currentTeamIndex + 1;
        const nextTeamId = gameTeams[nextTeamIndex].id;

        return nextTeamId;
    };

    const changeTeam = () => {
        const nextTeam = findNextTeam();

        setRoundPlayingTeam(nextTeam);
        stopGame();
    };

    const setGameWinner = () => {
        // @TODO: Implement
    };

    const addPoint = () => {
        const updatedRound = { ...currentRound };
        updatedRound.points[playingTeam.id]++;

        setCurrentRound(updatedRound);
    };

    // Words
    const setInitialWords = wordsList => {
        return wordsList[Math.floor(Math.random() * wordsList.length)];
    };

    const [words, setWords] = useState(setInitialWords(wordsDeck));
    const [guessedWords, setGuessedWords] = useState([]);

    useEffect(() => {
        if (isPlaying && !isRunning && timer !== 0) resumeTimer();

        if (!words.length) {
            if (currentRound.nextRound === ENDGAME_ID) {
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
        changeTeam();
        resetWords();
        setCurrentRound(gameRounds[currentRound.nextRound]);
    };

    // Timer
    const { timer, isRunning, resumeTimer, stopTimer, resetTimer } = useTimer(
        TOTAL_TIME,
        changeTeam
    );

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
        playingTeam,
    };
};
