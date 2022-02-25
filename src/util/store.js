import { configureStore } from '@reduxjs/toolkit';
import { gameReducer } from 'feature/game';
import { playersReducer } from 'feature/player';
import { turnReducer } from 'feature/turn/store/turnSlice';

export const store = configureStore({
    reducer: {
        playersSlice: playersReducer,
        turnSlice: turnReducer,
        gameSlice: gameReducer,
    },
});
