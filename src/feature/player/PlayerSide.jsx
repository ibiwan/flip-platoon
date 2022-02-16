import { TOKEN_POSITION_HOME } from '../../util/consts';
import { usePlayer } from './usePlayer';
import { Token } from '../token/Token'

import "./PlayerSide.css"

export const PlayerSide = ({ color }) => {
    const { player } = usePlayer(color)

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

                <h1 style={{
                    display: 'inline',
                    backgroundColor: "orange",
                    border: "1px solid black",
                }}>
                    PLAYER:
                    <br />
                    {color.toUpperCase()}
                </h1>
                <div className='playerSideTokens'>
                    {sideTokens && sideTokens.map(token =>
                        <Token token={token} />
                    )}
                </div>
            </div>
        </div>
    )
}
