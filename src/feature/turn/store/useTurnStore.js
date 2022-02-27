import { usePlayersStore } from 'feature/player';
import { useRootStore } from 'util/rootStore';

export const useTurnStore = () => {
    const { turnStore } = useRootStore();

    const {
        currentPlayer,
        turnTokens,
        hasFlipped,
        hasMoved,
        hasAttacked,
        startTurn: startTurnAction,
        recordTokenTurnPhase,
    } = turnStore;

    const {
        boardTokens
    } = usePlayersStore();

    const startTurn = (color) => {
        const playerTokens =
            boardTokens.filter(t => t.color === color);

        startTurnAction(
            color,
            playerTokens.map(t => t.id),
        );
    };

    return {
        currentPlayer,
        turnTokens,
        hasMoved,
        hasAttacked,
        hasFlipped,

        startTurn,
        recordTokenTurnPhase,
    };
};
