import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

export const Words = ({
    words,
    currentWord,
    wordIsCorrect,
    wordIsNotCorrect,
}) => {
    return (
        <div className="mt-5">
            <div className="flex justify-center items-center">
                <p className="text-marker font-bold text-6xl">
                    {words[currentWord]}
                </p>
            </div>
            {words.length && (
                <div className="flex justify-center items-center mt-5">
                    <button
                        class="bg-emerald-500 hover:bg-emerald-700 text-amber-50 font-bold py-2 px-4 rounded mr-3"
                        onClick={wordIsCorrect}
                    >
                        <FontAwesomeIcon icon={faCheck} />
                    </button>
                    <button
                        className="bg-rose-600 hover:bg-rose-700 text-amber-50 font-bold py-2 px-4 rounded"
                        onClick={wordIsNotCorrect}
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>
            )}
        </div>
    );
};
