import { createSlice } from '@reduxjs/toolkit';
import { TURN_PHASE_ATTACK, TURN_PHASE_FLIP, TURN_PHASE_MOVE } from '../../util/consts';

const tokenInit = {
    id: null,
    moveDone: false,
    attackDone: false,
    flipDone: false,
};

const turnInit = {
    currentPlayer: null,
    turnTokens: [],
    // currentTokenId: null,
};

export const turnSlice = createSlice({
    name: 'turnSlice',
    initialState: turnInit,
    reducers: {
        startTurnAction: (turnSlice, action) => {
            const { currentPlayer, turnTokens } = action.payload;
            turnSlice.currentPlayer = currentPlayer;
            turnSlice.turnTokens = turnTokens.map(id => ({
                ...tokenInit,
                id,
            }));
        },
        recordTokenTurnPhaseAction: (turnSlice, action) => {
            const { tokenId, phase } = action.payload;

            const token = turnSlice.turnTokens.find(t => t.id === tokenId);

            if (!token) {
                return;
            }

            switch (phase) {
                case TURN_PHASE_MOVE:
                    token.moveDone = true;
                    break;
                case TURN_PHASE_FLIP:
                    token.flipDone = true;
                    break;
                case TURN_PHASE_ATTACK:
                    token.attackDone = true;
                    break;
                default:
                    break;
            }

        }
    },
});

export const { startTurnAction, recordTokenTurnPhaseAction } = turnSlice.actions;

export const selectCurrentPlayer = slice => slice.turnSlice.currentPlayer;
export const selectTurnTokens = slice => slice.turnSlice.turnTokens;

export const turnReducer = turnSlice.reducer;
