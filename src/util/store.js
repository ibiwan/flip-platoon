import { configureStore } from "@reduxjs/toolkit";
import { gameReducer } from "../feature/game/gameSlice";
import { playersReducer } from "../feature/player/playersSlice";
import { turnReducer } from '../feature/turn/turnSlice';
import { boardReducer } from '../feature/board/boardSlice';

export const store = configureStore({
    reducer: {
        boardSlice: boardReducer,
        playersSlice: playersReducer,
        turnSlice: turnReducer,
        gameSlice: gameReducer,
    },
});
