import { merge } from 'lodash';

import { TOKEN_ARCHERS, TOKEN_ARTILLERY, TOKEN_CAVALRY, TOKEN_INFANTRY, TOKEN_MODE_ASSAULT, TOKEN_MODE_SKIRMISH } from "../util/consts";

const tokenBase = {
    health: 2,
    [TOKEN_MODE_ASSAULT]: {
        damage: 1,
        move: { min: 1, max: 2 },
        range: { min: 1, max: 1 },
    },
    [TOKEN_MODE_SKIRMISH]: {
        damage: 1,
        move: { min: 0, max: 1 },
        range: { min: 1, max: 1 },
    },
};

export const tokens = {
    [TOKEN_INFANTRY]: merge({}, tokenBase, {
        // assault: shields overhead, run
        // skirmish: shield forward, wall
    }),
    [TOKEN_ARCHERS]: merge({}, tokenBase, {
        // assault: arcing fire
        [TOKEN_MODE_ASSAULT]: {
            move: { min: 0 },
            range: { min: 3, max: 5 },
        },
        // skirmish: aimed fire
        [TOKEN_MODE_SKIRMISH]: {
            range: { min: 1, max: 3 }
        },
    }),
    [TOKEN_CAVALRY]: merge({}, tokenBase, {
        health: 3,
        // assault: shield & lance charge
        [TOKEN_MODE_ASSAULT]: {
            damage: 2,
            move: { max: 3 },
            range: { min: 2, max: 2 }
        },
        // skirmish: saber melee
        [TOKEN_MODE_SKIRMISH]: {
            move: { max: 2 }
        },
    }),
    [TOKEN_ARTILLERY]: merge({}, tokenBase, {
        health: 4,
        // assault: attack, stationary
        [TOKEN_MODE_ASSAULT]: {
            damage: 3,
            move: { min: 0, max: 0 },
            range: { min: 3, max: 5 }
        },
        // skirmish: moving, can't fire
        [TOKEN_MODE_SKIRMISH]: {
            damage: 0,
            move: { min: 1, max: 1 },
            range: { min: 0, max: 0 }
        },
    }),
};