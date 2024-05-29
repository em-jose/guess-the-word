import { twMerge } from "tailwind-merge";

export const GameInfo = ({
    currentRound,
    playingTeam,
    teams,
    remainingWords,
}) => {
    return (
        <div className="w-100">
            <ul>
                <li className="font-bold text-marker flex justify-center items-center">
                    <span className="text-xl uppercase mr-1">Round</span>
                    <span className="text-rose-600 text-4xl">
                        {currentRound.name}
                    </span>
                </li>
                <li className="flex justify-center items-center">
                    <span className="mr-1">Remaining words</span>
                    <span className="text-rose-600">{remainingWords}</span>
                </li>
            </ul>

            <ul>
                {teams.map(team => (
                    <li
                        key={team.name}
                        className={twMerge(
                            "flex justify-center items-center",
                            team.id == playingTeam.id && "current-team"
                        )}
                    >
                        <span className="">
                            {team.name} (Points: {currentRound.points[team.id]})
                        </span>
                    </li>
                ))}
            </ul>

            <ul className="list-disc max-w-48">
                {currentRound.rules.map((rule: string, i: number) => (
                    <li key={i}>{rule}</li>
                ))}
            </ul>
        </div>
    );
};
