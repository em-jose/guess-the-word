export const EndGame = ({ winnerName, winnerPoints, winnerTurns }) => {
    return (
        <div>
            <p>GAME ENDED</p>
            <p>Winner: {winnerName}</p>
            <p>Winner points: {winnerPoints}</p>
            <p>Winner won turns: {winnerTurns}</p>
        </div>
    );
};
