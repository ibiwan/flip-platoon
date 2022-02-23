import { useStatus } from './useStatus';

import "./Status.css"
import { TokenCard } from './TokenCard';

export const Status = () => {
    const {
        gameMode,
        inSetupMode,
        // readyToStart,
        startGame,
        selectedToken,
        clickSelectedToken,
        hoverSelectedToken,
    } = useStatus()

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
                <b>clickSelectedToken:</b> <pre>{JSON.stringify(clickSelectedToken, undefined, 2)}</pre>
            </div>
            <div className='jsonDiv'>
                <b>hoverSelectedToken:</b> <pre>{JSON.stringify(hoverSelectedToken, undefined, 2)}</pre>
            </div>
        </div>
    )
}
