import { nanoid } from '@reduxjs/toolkit';

import { anArray } from 'util';
import {
    TOKEN_ARCHERS,
    TOKEN_ARTILLERY,
    TOKEN_CAVALRY,
    TOKEN_INFANTRY,
    TOKEN_MODE_ASSAULT,
    TOKEN_REALM_HOME,
} from 'util/consts';
import { rules } from 'rules';

const {
    numArchers,
    numInfantry,
    numCavalry,
    numArtillery,
    tokens,
} = rules;

const makeToken = (type, color) => {
    const mode = TOKEN_MODE_ASSAULT;
    const realm = TOKEN_REALM_HOME;
    const position = null;
    const health = tokens[type].health;

    return {
        id: nanoid(6),
        type,
        color,
        mode,
        realm,
        position,
        health: health - 1,
        maxHealth: health,
    };
};

const arrayOfToken = (num, type, color) => anArray(num).map(() =>
    makeToken(type, color)
);

export const playerInit = color => ({
    color,
    tokens: [
        ...arrayOfToken(numArchers, TOKEN_ARCHERS, color),
        ...arrayOfToken(numInfantry, TOKEN_INFANTRY, color),
        ...arrayOfToken(numCavalry, TOKEN_CAVALRY, color),
        ...arrayOfToken(numArtillery, TOKEN_ARTILLERY, color),
    ],
});
