import { useMemo } from "react"
import { useGameSlice } from "./useGameSlice"

export const useGame = () => {
    const {
        gameMode,
        setSelectedToken,
        allTokens,
    } = useGameSlice()

    const tokenSummary = useMemo(() => {
        const summaries = allTokens.map(({ id, position }) => ({ id, position }))
        return JSON.stringify(summaries)
    }, [allTokens])

    return {
        gameMode,
        setSelectedToken,
        tokenSummary,
    }
}
