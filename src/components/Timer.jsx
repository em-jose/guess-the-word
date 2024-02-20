export const Timer = ({ timer, stopTimer, resumeTimer }) => {
    return (
        <div>
            <h2>{timer}</h2>
            <button
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-3"
                onClick={stopTimer}
            >
                <span>Stop timer</span>
            </button>
            <button
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-3"
                onClick={resumeTimer}
            >
                <span>Resume timer</span>
            </button>
        </div>
    );
};
