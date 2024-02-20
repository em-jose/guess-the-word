export const Fullscreen = () => {
    return (
        <div>
            <button onClick={() => document.body.requestFullscreen()}>
                Enter full screen
            </button>
            <button onClick={() => document.exitFullscreen()}>
                Exit full screen
            </button>
        </div>
    );
};
