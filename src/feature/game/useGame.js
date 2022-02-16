import { useGameSlice } from "./useGameSlice"

export const useGame = () => {
    const {gameMode}  = useGameSlice()

    return {
        gameMode,
    }
}
