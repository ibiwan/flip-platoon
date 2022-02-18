import { baseRules } from './baseRules';
import { tokens } from './tokens'
import { resistances } from './resistances'
import * as validMoves from './validMoves'

export const rules = {
    ...baseRules,
    tokens,
    resistances,
    validMoves,
}
