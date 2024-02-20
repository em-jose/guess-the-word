export const GameInfo = ({
    currentTurn,
    currentTeam,
    teams,
    remainingWords,
}) => {
    return (
        <div className="w-100">
            <ul>
                <li className="font-bold text-marker flex justify-center items-center">
                    <span className="text-xl uppercase mr-1">Round</span>
                    <span className="text-rose-600 text-4xl">
                        {currentTurn}
                    </span>
                </li>
                <li className="flex justify-center items-center">
                    <span className="mr-1">Remaining words</span>
                    <span className="text-rose-600">{remainingWords}</span>
                </li>
                {teams.map((team, i) => (
                    <li
                        key={i}
                        className={`flex justify-center items-center ${
                            i == currentTeam ? "current-team" : ""
                        }`}
                    >
                        <span className="">
                            {team.name} (Points: {team.points}, Won rounds:
                            {team.wonTurns})
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};
