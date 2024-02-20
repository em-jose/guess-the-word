export const Words = ({
    words,
    currentWord,
    wordIsCorrect,
    wordIsNotCorrect,
}) => {
    return (
        <div>
            <p>{words[currentWord]}</p>
            {words.length && (
                <div>
                    <button onClick={wordIsCorrect}>Correct!</button>
                    <button onClick={wordIsNotCorrect}>Incorrect</button>
                </div>
            )}
        </div>
    );
};
