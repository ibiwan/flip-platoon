import { configureStore } from '@reduxjs/toolkit';
import { gameReducer } from 'feature/game';
import { playersReducer } from 'feature/player';
import { turnReducer } from 'feature/turn/store/turnSlice';
import { boardReducer } from 'feature/board';

export const store = configureStore({
    reducer: {
        boardSlice: boardReducer,
        playersSlice: playersReducer,
        turnSlice: turnReducer,
        gameSlice: gameReducer,
    },
});
