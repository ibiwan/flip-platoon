import { ijkey } from "../../util";
import { useBoardSlice } from "./useBoardSlice";

export const useBoard = () => {
    const { boardPieces } = useBoardSlice()

    const hashedPieces = boardPieces.reduce((acc, cur) => {
        const { position: { i, j } } = cur
        acc[ijkey(i, j)] = cur
        return acc
    }, {})

    return { hashedPieces }
}