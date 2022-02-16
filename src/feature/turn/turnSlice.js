import { createSlice } from '@reduxjs/toolkit'

const pieceInit = {
    id: null,
    moveDone: false,
    actionDone: false,
    flipDone: false,
}
const turnInit = {
    currentPlayer: null,
    piecesMoved: [], // id
    currentPiece: pieceInit

}
export const turnSlice = createSlice({
    name: 'turnSlice',
    initialState: turnInit,
    reducer: {
        a: () => { }
    },
})

export const { a } = turnSlice.actions

export const turnReducer = turnSlice.reducer
