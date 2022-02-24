import { createSlice } from '@reduxjs/toolkit'

const tokenInit = {
    id: null,
    moveDone: false,
    actionDone: false,
    flipDone: false,
}

const turnInit = {
    currentPlayer: null,
    turnTokens: [],
    // currentTokenId: null,
}

export const turnSlice = createSlice({
    name: 'turnSlice',
    initialState: turnInit,
    reducers: {
        startTurnAction: (turnSlice, action) => {
            console.log({ action })
        }
    },
})

export const { startTurnAction } = turnSlice.actions

export const selectCurrentPlayer = slice => slice.turnSlice.currentPlayer
export const selectTurnTokens = slice => slice.turnSlice.turnTokens

export const turnReducer = turnSlice.reducer
