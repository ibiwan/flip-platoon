import { createSlice } from '@reduxjs/toolkit'

const tokenInit = {
    id: null,
    moveDone: false,
    actionDone: false,
    flipDone: false,
}

const turnInit = {
    currentPlayer: null,
    tokensMoved: [], // id
    currentToken: tokenInit
}

export const turnSlice = createSlice({
    name: 'turnSlice',
    initialState: turnInit,
    reducers: {
        aAction: () => { }
    },
})

export const { aAction } = turnSlice.actions

export const turnReducer = turnSlice.reducer
