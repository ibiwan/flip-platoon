import { useStatus } from './useStatus';

import "./Status.css"

export const Status = () => {
    const { gameMode, inSetupMode, readyToStart, startGame } = useStatus()

    return (
        <div className='statusArea'>
            status
            <br />
            game mode: {gameMode}
            {inSetupMode &&
                <button type="button" disabled={!readyToStart} onClick={() => startGame()}>Start Game</button>
            }
        </div>
    )
}
