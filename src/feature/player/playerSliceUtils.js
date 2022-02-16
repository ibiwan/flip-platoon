import { nanoid } from '@reduxjs/toolkit';
import { anArray, rand } from '../../util';
import { PIECE_ARCHERS, PIECE_ARTILLERY, PIECE_CAVALRY, PIECE_INFANTRY, PIECE_MODE_ASSAULT, PIECE_MODE_SKIRMISH, PIECE_POSITION_HOME } from '../../util/consts';
import { rules } from '../../util/rules';

const {
    numArchers,
    numInfantry,
    numCavalry,
    numArtillery,
} = rules

const makePiece = (type, color) => {
    const r = rand(2)
    console.log({ r })
    const mode = r ?
        PIECE_MODE_SKIRMISH :
        PIECE_MODE_ASSAULT
    //PIECE_MODE_SKIRMISH
    const position = { i: rand(10), j: rand(10) }
    // PIECE_POSITION_HOME,

    return {
        id: nanoid(6),
        type,
        color,
        mode,
        position,

    }
}

const arrayOfPiece = (num, type, color) => anArray(num).map(() =>
    makePiece(type, color)
)

export const playerInit = color => ({
    color,
    pieces: [
        ...arrayOfPiece(numArchers, PIECE_ARCHERS, color),
        ...arrayOfPiece(numInfantry, PIECE_INFANTRY, color),
        ...arrayOfPiece(numCavalry, PIECE_CAVALRY, color),
        ...arrayOfPiece(numArtillery, PIECE_ARTILLERY, color),
    ],
})
