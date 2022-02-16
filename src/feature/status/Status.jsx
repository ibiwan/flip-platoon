import { useStatus } from './useStatus';

import "./Status.css"

export const Status = () => {
    const { gameMode } = useStatus()

    return (
        <div className='statusArea'>
            status
            <br />
            game mode: {gameMode}
        </div>
    )
}
