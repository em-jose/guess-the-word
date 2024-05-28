import { twMerge } from "tailwind-merge";

export const GameInfo = ({
    currentRound,
    currentTeamName,
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
                {teams.map(team => (
                    <li
                        key={team.name}
                        className={twMerge(
                            "flex justify-center items-center",
                            team.name == currentTeamName && "current-team"
                        )}
                    >
                        <span className="">
                            {team.name} (Points: {team.points}, Won rounds:
                            {team.wonRounds})
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};
