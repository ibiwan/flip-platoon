import { createSelector, createSlice } from '@reduxjs/toolkit';
import { ijkey } from '../../util';
import { GAME_MODE_SETUP } from '../../util/consts';

import {
    selectAllTokens,
    selectBoardTokens,
    selectHashedBoardTokens,
    selectOliveTokens,
    selectTanTokens,
} from '../player/playersSlice';

import { rules } from '../../rules';
const { validMoves } = rules;

const gameInit = {
    mode: GAME_MODE_SETUP,
    currentPlayer: null,
    clickedTokenId: null,
    hoveredTokenId: null,
    draggedTokenId: null,
};
export const gameSlice = createSlice({
    name: 'gameSlice',
    initialState: gameInit,
    reducers: {
        setGameModeAction: (gameSlice, { payload }) => { gameSlice.mode = payload; },
        setCurrentPlayerAction: (gameSlice, { payload }) => { gameSlice.currentPlayer = payload; },
        setClickedTokenIdAction: (gameSlice, { payload }) => { gameSlice.clickedTokenId = payload; },
        setHoveredTokenIdAction: (gameSlice, { payload }) => { gameSlice.hoveredTokenId = payload; },
        setDraggedTokenIdAction: (gameSlice, { payload }) => { gameSlice.draggedTokenId = payload; },
    },
});

export const {
    setGameModeAction,
    setCurrentPlayerAction,
    setClickedTokenIdAction,
    setHoveredTokenIdAction,
    setDraggedTokenIdAction,
} = gameSlice.actions;

export const selectGameMode = state => state.gameSlice.mode;
export const selectCurrentPlayer = state => state.gameSlice.currentPlayer;
export const selectClickedTokenId = state => state.gameSlice.clickedTokenId;
export const selectHoveredTokenId = state => state.gameSlice.hoveredTokenId;
export const selectDraggedTokenId = state => state.gameSlice.draggedTokenId;

export const selectOccupiedCells = createSelector(
    selectBoardTokens,
    boardTokens => boardTokens.map(({ position: { i, j } }) => ijkey(i, j))
);

export const selectOliveCells = createSelector(
    selectOliveTokens,
    boardTokens => boardTokens.map(({ position: { i, j } }) => ijkey(i, j))
);

export const selectTanCells = createSelector(
    selectTanTokens,
    boardTokens => boardTokens.map(({ position: { i, j } }) => ijkey(i, j))
);

export const selectClickedToken = createSelector(
    selectAllTokens,
    selectClickedTokenId,
    (allTokens, clickedId) =>
        allTokens.filter(({ id }) => id === clickedId).pop()
);

export const selectHoveredToken = createSelector(
    selectAllTokens,
    selectHoveredTokenId,
    (allTokens, hoveredId) =>
        allTokens.filter(({ id }) => id === hoveredId).pop()
);

export const selectDraggedToken = createSelector(
    selectAllTokens,
    selectDraggedTokenId,
    (allTokens, draggedId) =>
        allTokens.filter(({ id }) => id === draggedId).pop()
);

export const selectSelectedTokenId = createSelector(
    selectClickedTokenId,
    selectHoveredTokenId,
    selectDraggedTokenId,
    (clickId, hoverId, dragId) => dragId ?? clickId ?? hoverId
);

export const selectSelectedToken = createSelector(
    selectAllTokens,
    selectSelectedTokenId,
    (allTokens, selectedId) =>
        allTokens.filter(({ id }) => id === selectedId).pop()
);

export const selectValidMoves = createSelector(
    selectGameMode,
    selectOccupiedCells,
    selectSelectedToken,
    (gameMode, occupiedCells, selectedToken) => {
        if (!selectedToken) {
            return [];
        }

        return (
            [
                ...validMoves.getValidStarts(gameMode, occupiedCells, selectedToken),
                ...validMoves.getValidMoves(gameMode, occupiedCells, selectedToken),
            ]
        );
    }
);

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
            return [];
        }

        return validMoves.getValidAttacks(
            gameMode,
            hashedBoardTokens,
            selectedToken,
        );
    }
);

export const gameReducer = gameSlice.reducer;
