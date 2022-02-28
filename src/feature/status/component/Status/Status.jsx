import { observer } from 'mobx-react-lite';

import { TokenCard } from '../TokenCard';

import { useStatus } from './useStatus';
import './Status.css';
import { DictEntry } from '../DictEntry/DictEntry';

export const Status = observer(() => {
    const {
        gameMode,
        inSetupMode,
        inPlayingMode,
        currentPlayer,
        turnTokens,
        tanReadyToStart,
        oliveReadyToStart,
        boardReadyToStart,
        gameReadyToStart,
        numOliveSkirmishTokens,
        numTanSkirmishTokens,
        firstPlayer,
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
            <DictEntry k='game mode' v={gameMode} />
            {inPlayingMode &&
                <DictEntry k='current player' v={currentPlayer} />
            }
            {inSetupMode && <>
                <DictEntry k='olive ready' v={oliveReadyToStart ? 'true' : 'false'} />
                <DictEntry k='tan ready' v={tanReadyToStart ? 'true' : 'false'} />
                <DictEntry k='board ready' v={boardReadyToStart ? 'true' : 'false'} />
                <DictEntry k='game (all) ready' v={gameReadyToStart ? 'true' : 'false'} />
                <DictEntry k='# olive skirms' v={numOliveSkirmishTokens} />
                <DictEntry k='# tan skirms' v={numTanSkirmishTokens} />
                <DictEntry k='first player' v={firstPlayer} />

                <button
                    type='button'
                    disabled={!gameReadyToStart}
                    onClick={onStartGame}
                >Start Game</button>
            </>
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
            {inPlayingMode &&
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
            <DictEntry k='selectedToken' v={selectedToken?.id} />
            <DictEntry k='clickedToken' v={clickedToken?.id} />
            <DictEntry k='hoveredToken' v={hoveredToken?.id} />
            <DictEntry k='draggedToken' v={draggedToken?.id} />
        </div>
    );
});
