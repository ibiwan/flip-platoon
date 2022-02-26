import {
    makeAutoObservable,
} from 'mobx';

import {
    TURN_PHASE_ATTACK,
    TURN_PHASE_FLIP,
    TURN_PHASE_MOVE,
} from 'util/consts';

let turnStore;

const tokenInit = {
    id: null,
    moveDone: false,
    attackDone: false,
    flipDone: false,
};

const startTurn = (
    currentPlayer, turnTokens) => {
    turnStore.currentPlayer = currentPlayer;
    turnStore.turnTokens = turnTokens.map(id => ({
        ...tokenInit,
        id,
    }));
};

const recordTokenTurnPhase = (tokenId, phase) => {
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
};

const initialState = {
    currentPlayer: null,
    turnTokens: [],

    canFlip: tokenId => !turnStore.turnTokens?.find(t => t.id === tokenId)?.flipDone,
    canMove: tokenId => !turnStore.turnTokens?.find(t => t.id === tokenId)?.moveDone,
    canAttack: tokenId => !turnStore.turnTokens?.find(t => t.id === tokenId)?.attackDone,

    startTurn,
    recordTokenTurnPhase,
};

export const getTurnStore = () => {
    turnStore = turnStore ??
        makeAutoObservable(initialState);

    return turnStore;
};
