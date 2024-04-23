import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faStop, faPlay } from "@fortawesome/free-solid-svg-icons";

export const Timer = ({ timer, isRunning, stopTimer, resumeTimer }) => {
    return (
        <div className="mt-1">
            <div className="flex justify-center items-center">
                <span className="text-marker text-rose-600 text-5xl">
                    {timer}
                </span>
            </div>
            <div className="flex justify-center items-center mt-2">
                {isRunning ? (
                    <button
                        className="bg-transparent text-black font-semibold py-2 px-4 border border-black rounded"
                        onClick={stopTimer}
                    >
                        <FontAwesomeIcon icon={faStop} />
                    </button>
                ) : (
                    <button
                        className="bg-transparent text-black font-semibold py-2 px-4 border border-black rounded"
                        onClick={resumeTimer}
                    >
                        <FontAwesomeIcon icon={faPlay} />
                    </button>
                )}
            </div>
        </div>
    );
};
