import { ijkey } from "../../util";
import { useBoardSlice } from "./useBoardSlice";

export const useBoard = () => {
    const {
        boardTokens,
        selectedTokenId,
        setSelectedToken,
        validCells,
        moveSelectedTokenTo,
    } = useBoardSlice()

    const hashedTokens = boardTokens.reduce((acc, cur) => {
        const { position: { i, j } } = cur
        acc[ijkey(i, j)] = cur
        return acc
    }, {})

    return {
        hashedTokens,
        selectedTokenId,
        setSelectedToken,
        validCells,
        moveSelectedTokenTo,
    }
}