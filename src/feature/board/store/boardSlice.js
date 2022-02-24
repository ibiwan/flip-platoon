import { createSlice } from '@reduxjs/toolkit';

const boardInit = {
    hoveredBoardCell: null,
};

export const boardSlice = createSlice({
    name: 'boardSlice',
    initialState: boardInit,
    reducers: {
        setHoveredBoardCellAction: (boardSlice, { payload }) => {
            boardSlice.hoveredBoardCell = payload;
        },
    },
});

export const { setHoveredBoardCellAction } = boardSlice.actions;

export const selectHoveredBoardCell = state =>
    state.boardSlice.hoveredBoardCell;


export const boardReducer = boardSlice.reducer;
