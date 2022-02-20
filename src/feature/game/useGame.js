import { useMemo } from "react"
import { useGameSlice } from "./useGameSlice"
import { usePlayerSlice } from '../player/usePlayerSlice'

export const useGame = () => {
    const { gameMode } = useGameSlice()
    const { allTokens } = usePlayerSlice()

    const tokenSummary = useMemo(() => {
        const summaries = allTokens.map(({ id, position }) => ({ id, position }))
        return JSON.stringify(summaries)
    }, [allTokens])

    return {
        gameMode,
        tokenSummary,
    }
}
