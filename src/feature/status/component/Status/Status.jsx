import { useStatus } from './useStatus';

import './Status.css';
import { TokenCard } from '../TokenCard';

export const Status = () => {
    const {
        gameMode,
        inSetupMode,
        inPlayingMode,
        currentPlayer,
        turnTokens,
        // readyToStart,
        startGame,
        startOliveTurn,
        startTanTurn,
        selectedToken,
        clickedToken,
        hoveredToken,
        draggedToken,
    } = useStatus();

    const onStartGame = e => {
        e.stopPropagation();
        startGame();
    };

    const onStartTanTurn = e => {
        e.stopPropagation();
        startTanTurn();
    };

    const onStartOliveTurn = e => {
        e.stopPropagation();
        startOliveTurn();
    };

    return (
        <div className='statusArea' style={{ display: 'flex', flexDirection: 'column' }}>
            <h1>
                STATUS
            </h1>
            <div className='jsonDiv'>
                <b>game mode:</b> {gameMode}
            </div>
            {inPlayingMode &&
                <div>

                    <b>current player:</b> {currentPlayer}
                </div>
            }
            {inSetupMode &&
                <button
                    type='button'
                    // disabled={!readyToStart}
                    onClick={onStartGame}
                >Start Game</button>
            }
            {inPlayingMode &&
                <button
                    type='button'
                    onClick={onStartTanTurn}
                >Start Tan Turn</button>
            }
            {inPlayingMode &&
                <button
                    type='button'
                    onClick={onStartOliveTurn}
                >Start Olive Turn</button>
            }
            {
                inPlayingMode &&
                <div className='turn-tokens'>
                    <h2>
                        Turn Tokens
                    </h2>
                    {turnTokens.map(tokenMove => {

                        return (
                            <div className='token-turn' key={tokenMove.id}>
                                token: {tokenMove.id}
                                <div className='turn-portion'>
                                    <input type='checkbox' checked={tokenMove.moveDone} readOnly /> move done
                                </div>
                                <div className='turn-portion'>
                                    <input type='checkbox' checked={tokenMove.attackDone} readOnly /> attack done
                                </div>
                                <div className='turn-portion'>
                                    <input type='checkbox' checked={tokenMove.flipDone} readOnly /> flip done
                                </div>
                            </div>
                        );
                    })}
                </div>
            }
            {selectedToken &&
                <TokenCard token={selectedToken} />
            }
            <div className='jsonDiv'>
                <b>selectedToken:</b> <pre>{selectedToken?.id}</pre>
            </div>
            <div className='jsonDiv'>
                <b>clickedToken:</b> <pre>{clickedToken?.id}</pre>
            </div>
            <div className='jsonDiv'>
                <b>hoveredToken:</b> <pre>{hoveredToken?.id}</pre>
            </div>
            <div className='jsonDiv'>
                <b>draggedToken:</b> <pre>{draggedToken?.id}</pre>
            </div>
        </div>
    );
};
