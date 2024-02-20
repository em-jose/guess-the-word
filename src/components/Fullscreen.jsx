import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand } from "@fortawesome/free-solid-svg-icons";

export const Fullscreen = () => {
    const handleFullScreen = () => {
        // document.body.requestFullscreen();
        // document.exitFullscreen();
    };

    return (
        <div className="my-5">
            <button
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded mr-3"
                onClick={handleFullScreen}
            >
                <FontAwesomeIcon icon={faExpand} />
            </button>
        </div>
    );
};
