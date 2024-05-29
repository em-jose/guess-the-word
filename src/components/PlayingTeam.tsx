export const PlayingTeam = ({ playingTeam }) => {
    return (
        <div className="flex justify-center items-center">
            <span className="text-marker">{playingTeam.name}</span>
        </div>
    );
};
