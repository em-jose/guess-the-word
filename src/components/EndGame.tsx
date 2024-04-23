export const EndGame = ({ winnerName, winnerPoints, winnerRounds }) => {
    return (
        <div>
            <p>GAME ENDED</p>
            <p>Winner: {winnerName}</p>
            <p>Winner points: {winnerPoints}</p>
            <p>Winner won rounds: {winnerRounds}</p>
        </div>
    );
};
