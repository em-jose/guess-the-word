export const Timer = ({ timer, stopTimer, resumeTimer }) => {
    return (
        <div>
            <h2>{timer}</h2>
            <button onClick={stopTimer}>
                <span>Stop timer</span>
            </button>
            <button onClick={resumeTimer}>
                <span>Resume timer</span>
            </button>
        </div>
    );
};
