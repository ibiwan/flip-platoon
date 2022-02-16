import { nanoid } from '@reduxjs/toolkit';
import { anArray, rand } from '../../util';
import { TOKEN_ARCHERS, TOKEN_ARTILLERY, TOKEN_CAVALRY, TOKEN_INFANTRY, TOKEN_MODE_ASSAULT, TOKEN_MODE_SKIRMISH, TOKEN_POSITION_HOME } from '../../util/consts';
import { rules } from '../../util/rules';

const {
    numArchers,
    numInfantry,
    numCavalry,
    numArtillery,
} = rules

const makeToken = (type, color) => {
    const mode = rand(2) ?
        TOKEN_MODE_SKIRMISH : // default
        TOKEN_MODE_ASSAULT
    const position = !rand(4) ?
        { i: rand(10), j: rand(10) } :
        TOKEN_POSITION_HOME // default

    return {
        id: nanoid(6),
        type,
        color,
        mode,
        position,

    }
}

const arrayOfToken = (num, type, color) => anArray(num).map(() =>
    makeToken(type, color)
)

export const playerInit = color => ({
    color,
    tokens: [
        ...arrayOfToken(numArchers, TOKEN_ARCHERS, color),
        ...arrayOfToken(numInfantry, TOKEN_INFANTRY, color),
        ...arrayOfToken(numCavalry, TOKEN_CAVALRY, color),
        ...arrayOfToken(numArtillery, TOKEN_ARTILLERY, color),
    ],
})
