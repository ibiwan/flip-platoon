import { GAME_MODE_PLAYING, GAME_MODE_SETUP } from '../../util/consts';

import { useGameSlice } from '../game/useGameSlice'
import { usePlayerSlice } from '../player/usePlayerSlice'

export const useStatus = () => {
    const {
        gameMode,
        setGameMode,
        selectedToken,
        clickedToken,
        hoveredToken,
        draggedToken,
    } = useGameSlice();

    const readyToStart = usePlayerSlice();

    const inSetupMode = gameMode === GAME_MODE_SETUP

    const startGame = () => setGameMode(GAME_MODE_PLAYING)

    return {
        gameMode,
        inSetupMode,
        readyToStart,
        startGame,
        selectedToken,
        clickedToken,
        hoveredToken,
        draggedToken,
    }
}
