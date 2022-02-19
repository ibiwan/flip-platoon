import { TOKEN_POSITION_HOME } from '../../util/consts';
import { usePlayer } from './usePlayer';

import { Token } from '../token/Token'

import "./PlayerSide.css"

export const PlayerSide = ({ color }) => {
    const { player, selectedTokenId, setSelectedToken } = usePlayer(color)

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
