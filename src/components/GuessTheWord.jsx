import { Fullscreen } from "./Fullscreen";
import { GameInfo } from "./GameInfo";
import { EndGame } from "./EndGame";
import { Timer } from "./Timer";
import { Words } from "./Words";
import { PlayingTeam } from "./PlayingTeam";
import { PlayButton } from "./PlayButton";
import { useGame } from "../hooks/useGame";

const CURRENT_TEAM = 0;
const WAITING_TEAM = 1;
const CURRENT_WORD = 0;

export const GuessTheWord = () => {
    const {
        isPlaying,
        ended,
        initGame,
        teams,
        winner,
        timer,
        isRunning,
        resumeTimer,
        stopTimer,
        words,
        wordIsCorrect,
        wordIsNotCorrect,
        currentTurn,
    } = useGame(CURRENT_TEAM, WAITING_TEAM, CURRENT_WORD);

    return (
        <div className="p-5 bg-amber-50">
            <header>
                <h1 className="title">Guess the Word!</h1>

                {/* <Fullscreen /> */}
            </header>

            <main>
                {ended ? (
                    <EndGame
                        winnerName={teams[winner].name}
                        winnerPoints={teams[winner].points}
                        winnerTurns={teams[winner].wonTurns}
                    />
                ) : (
                    <div>
                        {isPlaying ? (
                            <div>
                                <PlayingTeam
                                    teamName={teams[CURRENT_TEAM].name}
                                />

                                <Timer
                                    timer={timer}
                                    isRunning={isRunning}
                                    stopTimer={stopTimer}
                                    resumeTimer={resumeTimer}
                                />

                                <Words
                                    words={words}
                                    currentWord={words[CURRENT_WORD]}
                                    wordIsCorrect={wordIsCorrect}
                                    wordIsNotCorrect={wordIsNotCorrect}
                                />
                            </div>
                        ) : (
                            <div className="flex justify-center items-center flex-col">
                                <GameInfo
                                    currentTurn={currentTurn}
                                    teams={teams}
                                    remainingWords={words.length}
                                    currentTeam={CURRENT_TEAM}
                                />

                                <PlayButton initGame={initGame} />
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};
