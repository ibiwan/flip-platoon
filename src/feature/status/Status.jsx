import { useStatus } from './useStatus';

export const Status = () => {
    const { gameMode } = useStatus()

    return (
        <div>
            status
            <br />
            game mode: {gameMode}
        </div>
    )
}
