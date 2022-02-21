import { createSlice } from '@reduxjs/toolkit'

const boardInit = {
    hoverSelectedBoardCell: null,
}

export const boardSlice = createSlice({
    name: 'boardSlice',
    initialState: boardInit,
    reducers: {
        setHoverSelectedBoardCellAction: (boardSlice, { payload }) => {
            boardSlice.hoverSelectedBoardCell = payload
        },
    },
})

export const { setHoverSelectedBoardCellAction } = boardSlice.actions

export const selectHoverSelectedBoardCell = state =>
    state.boardSlice.hoverSelectedBoardCell


export const boardReducer = boardSlice.reducer
