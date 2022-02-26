import { PLAYER_TAN } from 'util/consts';
import { useRootStore } from 'util/rootStore';

export const usePlayersStore = () => {
    const { playersStore } = useRootStore();

    const {
        oliveTokens,
        occupiedCells,
        oliveCells,
        tanCells,
        tanTokens,
        allTokens,
        homeTokens,
        readyToStart,
        boardTokens,
        hashedBoardTokens,
        tokenSummary,

        setTokenLocation,
        setTokenMode,
        doTokenDamage,
    } = playersStore;

    return {
        oliveTokens,
        occupiedCells,
        oliveCells,
        tanCells,
        tanTokens,
        allTokens,
        homeTokens,
        readyToStart,
        boardTokens,
        hashedBoardTokens,
        tokenSummary,

        tokenById: id => allTokens.find(token => token.id === id),
        tokensByColor: color => color === PLAYER_TAN ? tanTokens : oliveTokens,

        setTokenLocation,
        setTokenMode,
        doTokenDamage,
    };
};
