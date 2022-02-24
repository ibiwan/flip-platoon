import { TOKEN_REALM_HOME } from 'util/consts';
import { Token } from 'feature/token/component/Token/Token';

import { usePlayerSide } from './usePlayerSide';
import { useGameSlice } from 'feature/game';

import './PlayerSide.css';

export const PlayerSide = ({ color }) => {
    const { player, selectedTokenId } = usePlayerSide(color);
    const { setSelectedToken } = useGameSlice();

    const sideTokens = player?.tokens.filter(t => t.realm === TOKEN_REALM_HOME);

    return (
        <div
            id={`${color}-player`}
            className='playerSide'
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
    );
};
