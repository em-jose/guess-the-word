import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand } from "@fortawesome/free-solid-svg-icons";

export const Fullscreen = () => {
    const handleFullScreen = () => {
        if (fullscreen) {
            document.exitFullscreen();
        } else {
            document.body.requestFullscreen();
        }
    };

    return (
        <div className="my-5">
            <button
                className="bg-transparent hover:bg-black text-black font-semibold hover:text-white py-1 px-2 border border-black hover:border-transparent rounded mr-3"
                onClick={handleFullScreen}
            >
                <FontAwesomeIcon icon={faExpand} />
            </button>
        </div>
    );
};
