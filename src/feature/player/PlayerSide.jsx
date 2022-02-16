import { usePlayer } from './usePlayer';

export const PlayerSide = ({ color }) => {
    const { player } = usePlayer(color)
    return (
        <div id={`${color}-player`} style={{ gridArea: `player-${color}` }}>
            player {color} side
            player: {JSON.stringify(player)}
        </div>
    )
}