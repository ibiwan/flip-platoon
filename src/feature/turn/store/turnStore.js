import {
    makeAutoObservable,
    runInAction,
} from 'mobx';
import { TURN_PHASE_ATTACK, TURN_PHASE_FLIP, TURN_PHASE_MOVE } from 'util/consts';

let turnStore;
const initialState = {
    currentPlayer: null,
    turnTokens: [],
};

const tokenInit = {
    id: null,
    moveDone: false,
    attackDone: false,
    flipDone: false,
};

export const getTurnStore = () => {
    turnStore = turnStore ??
        makeAutoObservable(initialState);

    return turnStore;
};

export const startTurn = (currentPlayer, turnTokens) =>
    runInAction(() => {
        turnStore.currentPlayer = currentPlayer;
        turnStore.turnTokens = turnTokens.map(id => ({
            ...tokenInit,
            id,
        }));
    });

export const recordTokenTurnPhase = (tokenId, phase) =>
    runInAction(() => {
        const token = turnStore.turnTokens.find(t => t.id === tokenId);

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
    });
