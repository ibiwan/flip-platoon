import { TOKEN_POSITION_HOME } from '../../util/consts';
import { Token } from '../token/Token'

import { usePlayerSide } from './usePlayerSide';
import { useSetSelectedToken } from '../game/useSetSelectedToken';

import "./PlayerSide.css"

export const PlayerSide = ({ color }) => {
    const { player, selectedTokenId } = usePlayerSide(color)
    const { setSelectedToken } = useSetSelectedToken()

    const sideTokens = player?.tokens.filter(t => t.position === TOKEN_POSITION_HOME)

    return (
        <div
            id={`${color}-player`}
            className="playerSide"
            style={{
                gridArea: `player-${color}`
            }}
        >
            <div className='playerSideContent'>
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
        </div>
    )
}
