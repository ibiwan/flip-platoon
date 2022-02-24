import { dist, getAllCells } from "../util";
import {
    GAME_MODE_PLAYING, GAME_MODE_SETUP,
    PLAYER_OLIVE, PLAYER_TAN,
    TOKEN_REALM_BOARD, TOKEN_REALM_HOME
} from "../util/consts";
import { tokens } from "./tokens";
import { baseRules } from "./baseRules";

const { boardSize } = baseRules;

const START_ROWS = {
    [PLAYER_OLIVE]: [0, 1],
    [PLAYER_TAN]: [boardSize - 1, boardSize - 2]
};

export const getValidDestinations = (gameMode, occupiedCells, selectedToken) =>
    gameMode === GAME_MODE_SETUP || selectedToken.realm === TOKEN_REALM_HOME
        ? getValidStarts(gameMode, occupiedCells, selectedToken)
        : getValidMoves(gameMode, occupiedCells, selectedToken);

export const getValidStarts = (
    gameMode,
    occupiedCells,
    selectedToken,
) => {
    if (!(
        gameMode === GAME_MODE_SETUP ||
        selectedToken.realm === TOKEN_REALM_HOME
    )) {
        return [];
    }

    const allCells = getAllCells(boardSize);

    const validMoves = allCells.filter(({ i, j, key }) => {
        if (occupiedCells.includes(key)) {
            return false;
        }

        if (!START_ROWS[selectedToken.color].includes(i)) {
            return false;
        }

        return true;
    });

    return validMoves.map(({ key }) => key);
};

export const getValidMoves = (
    gameMode,
    occupiedCells,
    selectedToken,
) => {
    if (
        gameMode !== GAME_MODE_PLAYING ||
        selectedToken.realm !== TOKEN_REALM_BOARD
    ) {
        return [];
    }

    const allCells = getAllCells(boardSize);

    const move = tokens[selectedToken.type][selectedToken.mode].move;

    const validMoves = allCells.filter(({ i, j, key }) => {
        if (occupiedCells.includes(key)) {
            return false;
        }

        if (selectedToken && selectedToken.realm === TOKEN_REALM_BOARD) {
            const d = dist({ i, j }, selectedToken.position);

            if (d > move.max || d < move.min) {
                return false;
            }
        }

        return true;
    });

    return validMoves.map(({ key }) => key);
};

export const getValidAttacks = (
    gameMode,
    hashedBoardTokens,
    selectedToken,
) => {
    if (
        gameMode !== GAME_MODE_PLAYING ||
        selectedToken.realm !== TOKEN_REALM_BOARD
    ) {
        return [];
    }

    const allCells = getAllCells(boardSize);

    const range = tokens[selectedToken.type][selectedToken.mode].range;

    const validAttacks = allCells.filter(({ i, j, key }) => {
        if (key in hashedBoardTokens && hashedBoardTokens[key].color === selectedToken.color) {
            return false;
        }

        if (selectedToken && selectedToken.realm === TOKEN_REALM_BOARD) {
            const d = dist({ i, j }, selectedToken.position);

            if (d > range.max || d < range.min) {
                return false;
            }
        }

        return true;
    });

    return validAttacks.map(({ key }) => key);
};
