import { observer } from 'mobx-react-lite';

import { useGameStore } from 'feature/game';
import { Token } from 'feature/token';

import { usePlayerSide } from './usePlayerSide';
import './PlayerSide.css';
import { ReadyStartButton } from '../ReadyStartButton';

export const PlayerSide = observer(({ color }) => {
    const {
        playerHomeTokens,
        selectedTokenId,
        readyToStart,
        canSetReadyToStart,
        setReadyToStart,
    } = usePlayerSide(color);

    const {
        inSetupMode,
        setSelectedToken,
    } = useGameStore();

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
                {inSetupMode &&
                    <ReadyStartButton {...{
                        readyToStart,
                        canSetReadyToStart,
                        setReadyToStart,
                    }} />
                }
            </h1>
            <div className='playerSideTokens'>
                {playerHomeTokens && playerHomeTokens.map(token =>
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
