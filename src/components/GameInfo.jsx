export const GameInfo = ({
    currentTurn,
    currentTeam,
    teams,
    remainingWords,
}) => {
    return (
        <div>
            <ul>
                <li className="font-bold text-marker flex justify-center items-center">
                    <span className="text-xl uppercase mr-1">Turn</span>
                    <span className="text-4xl">{currentTurn}</span>
                </li>
                {teams.map((team, i) => (
                    <li
                        key={i}
                        className={`${i == currentTeam ? "current-team" : ""}`}
                    >
                        <span className="">
                            {team.name} (Points: {team.points}, Won turns:
                            {team.wonTurns})
                        </span>
                    </li>
                ))}
                <li>
                    <span className="">
                        Remaining words: {remainingWords}
                    </span>
                </li>
            </ul>
        </div>
    );
};
