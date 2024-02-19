import { useState } from "react";

export const Words = () => {
    const currentWord = 0;
    const [words, setWords] = useState([
        "Silent Hill",
        "Dark Souls",
        "Half Life",
    ]);
    const [guessedWords, setGuessedWords] = useState([]);

    const wordIsCorrect = () => {
        if (!words.length) return false;

        const updatedWords = [...words];
        const guessedWord = updatedWords.splice(currentWord, 1)[0];
        let updatedGuessedWords = [...guessedWords];

        updatedGuessedWords.push(guessedWord);

        setWords(updatedWords);
        setGuessedWords(updatedGuessedWords);
    };

    const wordIsNotCorrect = () => {
        if (!words.length) return false;

        let updatedWords = [...words];
        const incorrectWord = updatedWords.shift();

        updatedWords.push(incorrectWord);

        setWords(updatedWords);
    };

    return (
        <>
            <h1>Words</h1>

            <p>{words[currentWord]}</p>
            <p>{JSON.stringify(words)}</p>
            <p>{JSON.stringify(guessedWords)}</p>

            <button onClick={wordIsCorrect}>Correct!</button>
            <button onClick={wordIsNotCorrect}>Incorrect</button>
        </>
    );
};
