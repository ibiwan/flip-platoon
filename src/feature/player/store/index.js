import { usePlayersSlice } from './usePlayersSlice';
import {
    playersReducer,
    selectAllTokens,
    selectBoardTokens,
    selectHashedBoardTokens,
    selectOliveTokens,
    selectTanTokens,
} from './playersSlice';

export const selectors = {
    selectAllTokens,
    selectBoardTokens,
    selectHashedBoardTokens,
    selectOliveTokens,
    selectTanTokens,
};

export {
    usePlayersSlice,
    playersReducer,
};
