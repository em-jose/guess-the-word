export const GameInfo = ({
    currentTurn,
    currentTeam,
    teams,
    remainingWords,
}) => {
    return (
        <div>
            <ul>
                <li>Turn: {currentTurn}</li>
                {teams.map((team, i) => (
                    <li
                        key={i}
                        className={`${i == currentTeam ? "current-team" : ""}`}
                    >
                        <span>
                            {team.name} (Points: {team.points}, Won turns:
                            {team.wonTurns})
                        </span>
                    </li>
                ))}
                <li>Remaining words: {remainingWords}</li>
            </ul>
        </div>
    );
};
