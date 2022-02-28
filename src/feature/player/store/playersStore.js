import {
    makeAutoObservable,
} from 'mobx';

import { ijkey } from 'util';

import {
    PLAYER_OLIVE,
    PLAYER_TAN,
    STARTER_RANDOM,
    TOKEN_MODE_SKIRMISH,
    TOKEN_REALM_BOARD,
    TOKEN_REALM_GRAVE,
    TOKEN_REALM_HOME,
} from 'util/consts';

import { playerInit } from './playerStoreUtils';

const playersInit = {
    [PLAYER_OLIVE]: playerInit(PLAYER_OLIVE),
    [PLAYER_TAN]: playerInit(PLAYER_TAN),
};

let playersStore;

const getStoreToken = (store, token) => {
    return store[token.color]
        .tokens
        .find(({ id }) => id === token.id);
};

const getCellKeys = tokens => {
    return tokens.filter(({ realm }) =>
        realm === TOKEN_REALM_BOARD)
        .map(({ position: { i, j } }) =>
            ijkey(i, j));
};

let initialState = {
    ...playersInit,

    get oliveTokens() {
        return this[PLAYER_OLIVE].tokens;
    },
    get oliveCells() {
        return getCellKeys(this.oliveTokens);
    },
    get oliveHomeTokens() {
        return this.oliveTokens.filter(({ realm }) =>
            realm === TOKEN_REALM_HOME);
    },
    get numOliveHomeTokens() {
        return this.oliveHomeTokens.length;
    },
    get oliveSkirmishTokens() {
        return this.oliveTokens.filter(({ mode }) => mode === TOKEN_MODE_SKIRMISH);
    },
    get numOliveSkirmishTokens() {
        return this.oliveSkirmishTokens.length;
    },
    get oliveBoardTokens() {
        return this.oliveTokens.filter(({ realm }) => realm === TOKEN_REALM_BOARD);
    },

    get tanTokens() {
        return this[PLAYER_TAN].tokens;
    },
    get tanCells() {
        return getCellKeys(this.tanTokens);
    },
    get tanHomeTokens() {
        return this.tanTokens.filter(({ realm }) =>
            realm === TOKEN_REALM_HOME);
    },
    get numTanHomeTokens() {
        return this.tanHomeTokens.length;
    },
    get tanSkirmishTokens() {
        return this.tanTokens.filter(({ mode }) => mode === TOKEN_MODE_SKIRMISH);
    },
    get numTanSkirmishTokens() {
        return this.tanSkirmishTokens.length;
    },
    get tanBoardTokens() {
        return this.tanTokens.filter(({ realm }) => realm === TOKEN_REALM_BOARD);
    },

    get firstPlayer() {
        if (this.numOliveSkirmishTokens > this.numTanSkirmishTokens) { return PLAYER_OLIVE; }
        if (this.numTanSkirmishTokens > this.numOliveSkirmishTokens) { return PLAYER_TAN; }
        return STARTER_RANDOM;
    },
    get allTokens() {
        return [
            ...this.oliveTokens,
            ...this.tanTokens,
        ];
    },
    get tokenSummary() {
        const summary = this.allTokens.map(({ id, realm, position }) =>
            ({ id, realm, position }));

        return JSON.stringify(summary);
    },
    get occupiedCells() {
        return getCellKeys(this.allTokens);
    },
    get homeTokens() {
        return this.allTokens.filter(({ realm }) => realm === TOKEN_REALM_HOME);
    },
    get boardReadyToStart() {
        return this.homeTokens.length === 0;
    },
    get tanReadyToStart() {
        return this[PLAYER_TAN].readyToStart;
    },
    get oliveReadyToStart() {
        return this[PLAYER_OLIVE].readyToStart;
    },
    get boardTokens() {
        return this.allTokens.filter(({ realm }) =>
            realm === TOKEN_REALM_BOARD);
    },
    get hashedBoardTokens() {
        return this.boardTokens.reduce((acc, cur) => {
            const { position: { i, j } } = cur;
            const key = ijkey(i, j);
            acc[key] = cur;
            return acc;
        }, {});
    },

    setReadyToStart: (color, ready) => {
        playersStore[color].readyToStart = ready;
    },
    setTokenLocation: (token, i, j) => {
        const foundToken = getStoreToken(playersStore, token);
        foundToken.realm = TOKEN_REALM_BOARD;
        foundToken.position = { i, j };
    },
    setTokenMode: (token, mode) => {
        const foundToken = getStoreToken(playersStore, token);
        foundToken.mode = mode;
    },
    doTokenDamage: (token, damage) => {
        const foundToken = getStoreToken(playersStore, token);
        foundToken.health -= damage;
        if (foundToken.health <= 0) {
            foundToken.realm = TOKEN_REALM_GRAVE;
        }
    },
};

export const getPlayersStore = () => {
    playersStore = playersStore ??
        makeAutoObservable(initialState);

    return playersStore;
};
