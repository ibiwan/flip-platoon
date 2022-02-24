import { useStatus } from './useStatus';

import "./Status.css";
import { TokenCard } from './TokenCard';

export const Status = () => {
    const {
        gameMode,
        inSetupMode,
        // readyToStart,
        startGame,
        selectedToken,
        clickedToken,
        hoveredToken,
        draggedToken,
    } = useStatus();

    return (
        <div className='statusArea' style={{ display: 'flex', flexDirection: 'column' }}>
            <h1>
                STATUS
            </h1>
            <div className='jsonDiv'>
                <b>game mode:</b> {gameMode}
            </div>
            {inSetupMode &&
                <button
                    type="button"
                    // disabled={!readyToStart}
                    onClick={() => startGame()}
                >Start Game</button>
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
