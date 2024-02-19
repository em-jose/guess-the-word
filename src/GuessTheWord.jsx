import { Timer } from "./components/Timer";
import { Words } from "./components/Words";

export const GuessTheWord = () => {
    return (
        <>
            <Timer initialTimer={45} />
            <Words />
        </>
    );
};
