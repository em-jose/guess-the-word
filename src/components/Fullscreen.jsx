export const Fullscreen = () => {
    return (
        <div className="my-5">
            <button
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-3"
                onClick={() => document.body.requestFullscreen()}
            >
                Enter full screen
            </button>
            <button
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                onClick={() => document.exitFullscreen()}
            >
                Exit full screen
            </button>
        </div>
    );
};
