import { useGameSlice } from "./useGameSlice"

export const useGame = () => {
    const {
        gameMode,
        setSelectedToken,
    } = useGameSlice()

    return {
        gameMode,
        setSelectedToken,
    }
}
