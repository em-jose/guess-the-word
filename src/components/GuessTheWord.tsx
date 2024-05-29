import { Fullscreen } from "@components/Fullscreen";
import { GameInfo } from "@components/GameInfo";
import { EndGame } from "@components/EndGame";
import { Timer } from "@components/Timer";
import { Words } from "@components/Words";
import { PlayingTeam } from "@components/PlayingTeam";
import { PlayButton } from "@components/PlayButton";

import { useGame } from "@/hooks/useGame";

import { gameTeams } from "@/data/teams";

const CURRENT_WORD: number = 0;
const TOTAL_TIME: number = 2;

export const GuessTheWord = () => {
    const {
        isPlaying,
        ended,
        initGame,
        winner,
        timer,
        isRunning,
        resumeTimer,
        stopTimer,
        words,
        wordIsCorrect,
        wordIsNotCorrect,
        currentRound,
        playingTeam,
    } = useGame(CURRENT_WORD, TOTAL_TIME);

    return (
        <div className="p-5 bg-amber-50">
            <header>
                <h1 className="title">Guess the Word!</h1>

                <Fullscreen />
            </header>

            <main>
                {ended ? (
                    <EndGame />
                ) : (
                    <div>
                        {isPlaying ? (
                            <div>
                                <PlayingTeam playingTeam={playingTeam} />

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
                                    currentRound={currentRound}
                                    teams={gameTeams}
                                    remainingWords={words.length}
                                    playingTeam={playingTeam}
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
