import { createSelector, createSlice } from '@reduxjs/toolkit'
import { ijkey } from '../../util';
import { GAME_MODE_SETUP } from '../../util/consts'
import { selectAllTokens, selectBoardTokens } from '../player/playersSlice';
import { rules } from '../../rules';

const gameInit = {
    mode: GAME_MODE_SETUP,
    currentPlayer: null,
    selectedTokenId: null,
    hoverSelectedTokenId: null,
}
export const gameSlice = createSlice({
    name: 'gameSlice',
    initialState: gameInit,
    reducers: {
        setGameMode: (gameSlice, { payload }) => { gameSlice.mode = payload },
        setCurrentPlayer: (gameSlice, { payload }) => { gameSlice.currentPlayer = payload },
        setSelectedToken: (gameSlice, { payload }) => { gameSlice.selectedTokenId = payload },
        setHoverSelectedTokenId: (gameSlice, { payload }) => { gameSlice.hoverSelectedTokenId = payload },
    },
})

export const { setGameMode, setCurrentPlayer, setSelectedToken, setHoverSelectedTokenId } = gameSlice.actions

export const selectGameMode = state => state.gameSlice.mode
export const selectCurrentPlayer = state => state.gameSlice.currentPlayer
export const selectSelectedTokenId = state => state.gameSlice.selectedTokenId
export const selectHoverSelectedTokenId = state => state.gameSlice.hoverSelectedTokenId

export const selectOccupiedCells = createSelector(
    selectBoardTokens,
    boardTokens => boardTokens.map(({ position: { i, j } }) => ijkey(i, j))
)

const selectClickSelectedToken = createSelector(
    selectAllTokens,
    selectSelectedTokenId,
    (allTokens, selectedTokenId) =>
        allTokens.filter(({ id }) => id === selectedTokenId).pop()
)

const selectHoverSelectedToken = createSelector(
    selectAllTokens,
    selectHoverSelectedTokenId,
    (allTokens, hoverSelectedTokenId) =>
        allTokens.filter(({ id }) => id === hoverSelectedTokenId).pop()
)

export const selectSelectedToken = createSelector(
    selectClickSelectedToken,
    selectHoverSelectedToken,
    (click, hover) => click ?? hover
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
