import { dist, getAllCells } from "../util"
import { PLAYER_OLIVE, PLAYER_TAN, TOKEN_POSITION_HOME } from "../util/consts"
import { tokens } from "./tokens"
import { baseRules } from "./baseRules"

const { boardSize } = baseRules

const START_ROWS = {
    [PLAYER_OLIVE]: [0, 1],
    [PLAYER_TAN]: [boardSize-1, boardSize - 2]
}

export const getValidStarts = (occupiedCells, selectedToken) => {
    const allCells = getAllCells(boardSize)

    const validCells = allCells.filter(({ i, j, key }) => {
        if (occupiedCells.includes(key)) {
            return false;
        }

        if (!START_ROWS[selectedToken.color].includes(i)) {
            return false;
        }

        return true;
    })

    return validCells.map(({ key }) => key)
}

export const getValidMoves = (occupiedCells, selectedToken) => {
    const allCells = getAllCells(boardSize)

    let move
    if (selectedToken && selectedToken.position !== TOKEN_POSITION_HOME) {
        move = tokens[selectedToken.type][selectedToken.mode].move
    }

    const validCells = allCells.filter(({ i, j, key }) => {
        if (occupiedCells.includes(key)) {
            return false
        }

        if (selectedToken && selectedToken.position !== TOKEN_POSITION_HOME) {
            const d = dist({ i, j }, selectedToken.position)

            if (d > move.max || d < move.min) {
                return false
            }
        }

        return true
    })

    return validCells.map(({ key }) => key)
}