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
        boardTokensByColor,
    } = usePlayersStore();

    const startTurn = (color) => {
        const playerTokens = boardTokensByColor(color);

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
