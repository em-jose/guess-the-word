import { Fullscreen } from "@components/Fullscreen";
import { GameInfo } from "@components/GameInfo";
import { EndGame } from "@components/EndGame";
import { Timer } from "@components/Timer";
import { Words } from "@components/Words";
import { PlayingTeam } from "@components/PlayingTeam";
import { PlayButton } from "@components/PlayButton";
import { useGame } from "@/hooks/useGame";

const CURRENT_TEAM = 0;
const WAITING_TEAM = 1;
const CURRENT_WORD = 0;
const TOTAL_TIME = 45;
const TOTAL_ROUNDS = 3;

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
        currentRound,
    } = useGame(
        CURRENT_TEAM,
        WAITING_TEAM,
        CURRENT_WORD,
        TOTAL_TIME,
        TOTAL_ROUNDS
    );

    return (
        <div className="p-5 bg-amber-50">
            <header>
                <h1 className="title">Guess the Word!</h1>

                <Fullscreen />
            </header>

            <main>
                {ended ? (
                    <EndGame
                        winnerName={teams[winner].name}
                        winnerPoints={teams[winner].points}
                        winnerRounds={teams[winner].wonRounds}
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
                                    currentRound={currentRound}
                                    teams={teams}
                                    remainingWords={words.length}
                                    currentTeamName={teams[CURRENT_TEAM].name}
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
