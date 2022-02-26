import { observer } from 'mobx-react-lite';

import { TOKEN_REALM_HOME } from 'util/consts';

import { useGameStore } from 'feature/game';
import { Token } from 'feature/token';

import { usePlayerSide } from './usePlayerSide';
import './PlayerSide.css';

export const PlayerSide = observer(({ color }) => {
    const { tokensByColor, selectedTokenId } = usePlayerSide(color);
    const { setSelectedToken } = useGameStore();

    const sideTokens = tokensByColor(color).filter(({ realm }) =>
        realm === TOKEN_REALM_HOME);

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
});
