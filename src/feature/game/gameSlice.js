import { createSelector, createSlice } from '@reduxjs/toolkit'
import { ijkey } from '../../util';
import { GAME_MODE_SETUP } from '../../util/consts'
import { selectAllTokens, selectBoardTokens } from '../player/playersSlice';
import { rules } from '../../rules';

const gameInit = {
    mode: GAME_MODE_SETUP,
    currentPlayer: null,
    selectedTokenId: null,
}
export const gameSlice = createSlice({
    name: 'gameSlice',
    initialState: gameInit,
    reducers: {
        setGameMode: (gameSlice, { payload }) => { gameSlice.mode = payload },
        setCurrentPlayer: (gameSlice, { payload }) => { gameSlice.currentPlayer = payload },
        setSelectedToken: (gameSlice, { payload }) => { gameSlice.selectedTokenId = payload },
    },
})

export const { setGameMode, setCurrentPlayer, setSelectedToken } = gameSlice.actions

export const selectGameMode = state => state.gameSlice.mode
export const selectCurrentPlayer = state => state.gameSlice.currentPlayer
export const selectSelectedTokenId = state => state.gameSlice.selectedTokenId

export const selectOccupiedCells = createSelector(
    selectBoardTokens,
    boardTokens => boardTokens.map(({ position: { i, j } }) => ijkey(i, j))
)

export const selectSelectedToken = createSelector(
    selectAllTokens,
    selectSelectedTokenId,
    (allTokens, selectedTokenId) =>
        allTokens.filter(({ id }) => id === selectedTokenId).pop()
)

export const selectValidCells = createSelector(
    selectGameMode,
    selectOccupiedCells,
    selectSelectedToken,
    (gameMode, occupiedCells, selectedToken) => {
        if (!selectedToken) {
            return []
        }
        const { validMoves } = rules
        const getter = gameMode === GAME_MODE_SETUP ?
            validMoves.getValidStarts :
            validMoves.getValidMoves

        return getter(occupiedCells, selectedToken)
    }
)

export const gameReducer = gameSlice.reducer
