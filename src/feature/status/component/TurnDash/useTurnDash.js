import {
    PLAYER_OLIVE, PLAYER_TAN,
} from 'util/consts';

import { useGameStore } from 'feature/game';
import { useTurnStore } from 'feature/turn';

export const useTurnDash = () => {
    const {
        setClickedTokenId,
    } = useGameStore();

    const {
        currentPlayer,
        turnTokens,
        startTurn,
    } = useTurnStore();

    const startOliveTurn = e => {
        e.stopPropagation();

        startTurn(PLAYER_OLIVE);
        setClickedTokenId(null);
    };

    const startTanTurn = e => {
        e.stopPropagation();

        startTurn(PLAYER_TAN);
        setClickedTokenId(null);
    };

    return {
        currentPlayer,
        turnTokens,
        startOliveTurn,
        startTanTurn,
    };
};
