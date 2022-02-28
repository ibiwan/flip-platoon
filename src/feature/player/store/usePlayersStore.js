import { PLAYER_TAN } from 'util/consts';
import { useRootStore } from 'util/rootStore';

export const usePlayersStore = () => {
    const { playersStore } = useRootStore();

    const {
        occupiedCells,

        oliveTokens,
        oliveCells,
        oliveHomeTokens,
        numOliveHomeTokens,

        tanCells,
        tanTokens,
        tanHomeTokens,
        numTanHomeTokens,

        allTokens,
        tokenSummary,

        homeTokens,

        boardTokens,
        hashedBoardTokens,

        readyToStart,
        setReadyToStart,

        setTokenLocation,
        setTokenMode,
        doTokenDamage,
    } = playersStore;

    return {
        occupiedCells,

        oliveTokens,
        oliveCells,
        oliveHomeTokens,
        numOliveHomeTokens,

        tanCells,
        tanTokens,
        tanHomeTokens,
        numTanHomeTokens,

        allTokens,
        tokenSummary,

        homeTokens,

        boardTokens,
        hashedBoardTokens,

        readyToStart,
        setReadyToStart,

        tokenById: id => allTokens.find(token => token.id === id),
        tokensByColor: color => color === PLAYER_TAN ? tanHomeTokens : oliveHomeTokens,

        setTokenLocation,
        setTokenMode,
        doTokenDamage,
    };
};
