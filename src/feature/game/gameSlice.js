import { createSlice } from '@reduxjs/toolkit'
import { anArray, ijkey } from '../../util';
import { GAME_MODE_SETUP, PLAYERS, TOKEN_POSITION_HOME } from '../../util/consts'
import { rules } from '../../util/rules'

const { boardSize } = rules;

console.log({ rules })

const allCells = anArray(boardSize).flatMap((a, i) => {
    return anArray(boardSize).map((a, j) => ({ i, j, key: ijkey(i, j) }))
})

const gameInit = {
    mode: GAME_MODE_SETUP,
    currentPlayer: null,
    selectedTokenId: null,
}
export const gameSlice = createSlice({
    name: 'gameSlice',
    initialState: gameInit,
    reducers: {
        setMode: (gameSlice, { payload }) => { gameSlice.mode = payload },
        setCurrentPlayer: (gameSlice, { payload }) => { gameSlice.currentPlayer = payload },
        setSelectedToken: (gameSlice, { payload }) => { gameSlice.selectedTokenId = payload },
    },
})

export const { setMode, setCurrentPlayer, setSelectedToken } = gameSlice.actions

export const selectGameMode = state => state.gameSlice.mode
export const selectCurrentPlayer = state => state.gameSlice.currentPlayer
export const selectSelectedTokenId = state => state.gameSlice.selectedTokenId
export const selectValidCells = state => {
    const occupiedCells = PLAYERS
        .flatMap(color => {
            const positions = state
                .playersSlice[color]
                .tokens.map(
                    token => {
                        const { position } = token
                        if (TOKEN_POSITION_HOME === position) { return null }
                        const { i, j } = position
                        return ijkey(i, j)
                    }
                ).filter(v => v)
            return positions
        })

    const selectedTokenId = selectSelectedTokenId(state)
    const selectedToken = PLAYERS.flatMap(color => {
        return state.playersSlice[color]
            .tokens.filter(token => token.id === selectedTokenId)
    }).pop()
    console.log({ selectedTokenId })

    let move
    if (selectedToken && selectedToken.position !== TOKEN_POSITION_HOME) {
        move = rules.tokens[selectedToken.type][selectedToken.mode].move
    }

    const validCells = allCells.filter(({ i, j, key }) => {
        if (occupiedCells.includes(key)) {
            return false
        }

        if (selectedToken && selectedToken.position !== TOKEN_POSITION_HOME) {
            const d = Math.max(
                Math.abs(i - selectedToken.position.i),
                Math.abs(j - selectedToken.position.j))
            if (d > move.max || d < move.min) {
                return false
            }
        }

        return true
    })

    console.log({ validCells })

    return validCells.map(({ key }) => key)
}

export const gameReducer = gameSlice.reducer
