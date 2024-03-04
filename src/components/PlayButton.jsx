export const PlayButton = ({ initGame }) => {
    return (
        <button
            className="bg-rose-600 hover:bg-rose-700 text-amber-50 font-bold py-2 px-4 rounded text-marker mt-5"
            onClick={initGame}
        >
            Play!
        </button>
    );
};
