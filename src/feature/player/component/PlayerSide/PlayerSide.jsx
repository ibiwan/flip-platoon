import { observer } from 'mobx-react-lite';
import classNames from 'classnames';

import { useGameStore } from 'feature/game';
import { Token } from 'feature/token';

import { usePlayerSide } from './usePlayerSide';
import './PlayerSide.css';

export const PlayerSide = observer(({ color }) => {
    const {
        playerHomeTokens,
        selectedTokenId,
        readyToStart,
        setReadyToStart,
        canSetReadyToStart,
    } = usePlayerSide(color);

    const {
        inSetupMode,
        setSelectedToken,
    } = useGameStore();

    const onClickReady = e => {
        e.stopPropagation();
        setReadyToStart(true);
    };

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
                    <button
                        type="button"
                        className={classNames(
                            'ready-to-start-button',
                            { 'can-set-ready-to-start': canSetReadyToStart },
                            { 'is-ready-to-start': readyToStart, }
                        )}
                        disabled={!canSetReadyToStart}
                        onClick={onClickReady}
                    >
                        Ready To Start
                    </button>
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
