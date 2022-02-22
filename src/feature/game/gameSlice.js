import { createSelector, createSlice } from '@reduxjs/toolkit'
import { ijkey } from '../../util';
import { GAME_MODE_SETUP } from '../../util/consts'

import {
    selectAllTokens,
    selectBoardTokens,
    selectHashedBoardTokens,
    selectOliveTokens,
    selectTanTokens,
} from '../player/playersSlice';

import { rules } from '../../rules';
const { validMoves } = rules

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
        setGameModeAction: (gameSlice, { payload }) => { gameSlice.mode = payload },
        setCurrentPlayerAction: (gameSlice, { payload }) => { gameSlice.currentPlayer = payload },
        setSelectedTokenAction: (gameSlice, { payload }) => { gameSlice.selectedTokenId = payload },
        setHoverSelectedTokenIdAction: (gameSlice, { payload }) => { gameSlice.hoverSelectedTokenId = payload },
    },
})

export const {
    setGameModeAction,
    setCurrentPlayerAction,
    setSelectedTokenAction,
    setHoverSelectedTokenIdAction,
} = gameSlice.actions

export const selectGameMode = state => state.gameSlice.mode
export const selectCurrentPlayer = state => state.gameSlice.currentPlayer
export const selectSelectedTokenId = state => state.gameSlice.selectedTokenId
export const selectHoverSelectedTokenId = state => state.gameSlice.hoverSelectedTokenId

export const selectOccupiedCells = createSelector(
    selectBoardTokens,
    boardTokens => boardTokens.map(({ position: { i, j } }) => ijkey(i, j))
)

export const selectOliveCells = createSelector(
    selectOliveTokens,
    boardTokens => boardTokens.map(({ position: { i, j } }) => ijkey(i, j))
)

export const selectTanCells = createSelector(
    selectTanTokens,
    boardTokens => boardTokens.map(({ position: { i, j } }) => ijkey(i, j))
)

export const selectClickSelectedToken = createSelector(
    selectAllTokens,
    selectSelectedTokenId,
    (allTokens, selectedTokenId) =>
        allTokens.filter(({ id }) => id === selectedTokenId).pop()
)

export const selectHoverSelectedToken = createSelector(
    selectAllTokens,
    selectHoverSelectedTokenId,
    (allTokens, hoverSelectedTokenId) =>
        allTokens.filter(({ id }) => id === hoverSelectedTokenId).pop()
)

export const selectSelectedToken = createSelector(
    selectClickSelectedToken,
    selectHoverSelectedToken,
    (click, hover) => {
        return click ?? hover
    }
)

export const selectValidMoves = createSelector(
    selectGameMode,
    selectOccupiedCells,
    selectSelectedToken,
    (gameMode, occupiedCells, selectedToken) => {
        if (!selectedToken) {
            return []
        }

        return (
            [
                ...validMoves.getValidStarts(gameMode, occupiedCells, selectedToken),
                ...validMoves.getValidMoves(gameMode, occupiedCells, selectedToken),
            ]
        )
    }
)

export const selectValidAttacks = createSelector(
    selectGameMode,
    selectHashedBoardTokens,
    selectSelectedToken,
    (
        gameMode,
        hashedBoardTokens,
        selectedToken,
    ) => {
        if (!selectedToken) {
            return []
        }

        return validMoves.getValidAttacks(
            gameMode,
            hashedBoardTokens,
            selectedToken,
        );
    }
)

export const gameReducer = gameSlice.reducer
