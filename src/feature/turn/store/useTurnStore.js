import { usePlayersSlice } from 'feature/player';
import { useRootStore } from 'util/rootStore';

import {
    startTurn as startTurnAction,
    recordTokenTurnPhase,
} from './turnStore';

export const useTurnStore = () => {
    const { turnStore } = useRootStore();

    const currentPlayer = turnStore.currentPlayer;
    const turnTokens = turnStore.turnTokens;

    const {
        boardTokens
    } = usePlayersSlice();

    const startTurn = (color) => {
        const playerTokens =
            boardTokens.filter(t => t.color === color);

            startTurnAction(
            color,
            playerTokens.map(t => t.id),
        );
    };

    const canMove = (tokenId) => !turnTokens?.find(t => t.id === tokenId)?.moveDone;
    const canAttack = (tokenId) => !turnTokens?.find(t => t.id === tokenId)?.attackDone;
    const canFlip = (tokenId) => !turnTokens?.find(t => t.id === tokenId)?.flipDone;

    return {
        currentPlayer,
        turnTokens,
        canMove,
        canAttack,
        canFlip,
        startTurn,
        recordTokenTurnPhase,
    };
};
