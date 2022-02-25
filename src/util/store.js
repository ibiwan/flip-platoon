import { configureStore } from '@reduxjs/toolkit';
import { gameReducer } from 'feature/game';
import { playersReducer } from 'feature/player';

export const store = configureStore({
    reducer: {
        playersSlice: playersReducer,
        gameSlice: gameReducer,
    },
});
