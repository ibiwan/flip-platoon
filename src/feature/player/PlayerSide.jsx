import { TOKEN_POSITION_HOME } from '../../util/consts';
import { Token } from '../token/Token'

import { usePlayerSide } from './usePlayerSide';
import { useGameSlice } from '../game/useGameSlice';

import "./PlayerSide.css"

export const PlayerSide = ({ color }) => {
    const { player, selectedTokenId } = usePlayerSide(color)
    const { setSelectedToken } = useGameSlice()

    const sideTokens = player?.tokens.filter(t => t.position === TOKEN_POSITION_HOME)

    return (
        <div
            id={`${color}-player`}
            className="playerSide"
            style={{
                gridArea: `player-${color}`
            }}
        >
            <h1>
                PLAYER:
                <br />
                {color.toUpperCase()}
            </h1>
            <div className='playerSideTokens'>
                {sideTokens && sideTokens.map(token =>
                    <Token
                        key={token.id}
                        token={token}
                        selected={token.id === selectedTokenId}
                        setSelectedToken={setSelectedToken}
                    />
                )}
            </div>
        </div>
    )
}
