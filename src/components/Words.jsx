export const Words = ({
    words,
    currentWord,
    wordIsCorrect,
    wordIsNotCorrect,
}) => {
    return (
        <div className="mt-5">
            <p>{words[currentWord]}</p>
            {words.length && (
                <div>
                    <button
                        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-3"
                        onClick={wordIsCorrect}
                    >
                        Correct!
                    </button>
                    <button
                        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-3"
                        onClick={wordIsNotCorrect}
                    >
                        Incorrect
                    </button>
                </div>
            )}
        </div>
    );
};
