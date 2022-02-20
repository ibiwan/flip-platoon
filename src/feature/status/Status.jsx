import { useStatus } from './useStatus';

import "./Status.css"

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
            <div>
                <b>game mode:</b> {gameMode}
            </div>
            <div>
                <b>selectedToken:</b> <pre>{JSON.stringify(selectedToken, undefined, 2)}</pre>
            </div>
            <div>
                <b>clickSelectedToken:</b> <pre>{JSON.stringify(clickSelectedToken, undefined, 2)}</pre>
            </div>
            <div>
                <b>hoverSelectedToken:</b> <pre>{JSON.stringify(hoverSelectedToken, undefined, 2)}</pre>
            </div>
            {inSetupMode &&
                <button
                    type="button"
                    // disabled={!readyToStart}
                    onClick={() => startGame()}
                >Start Game</button>
            }
        </div>
    )
}
