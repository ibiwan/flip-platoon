import { PLAYER_TAN } from 'util/consts';
import { useRootStore } from 'util/rootStore';

export const usePlayersStore = () => {
    const { playersStore } = useRootStore();

    const {
        occupiedCells,

        oliveHomeTokens,
        numOliveSkirmishTokens,
        oliveBoardTokens,

        tanHomeTokens,
        numTanSkirmishTokens,
        tanBoardTokens,

        allTokens,
        tokenSummary,

        hashedBoardTokens,

        firstPlayer,
        boardReadyToStart,
        tanReadyToStart,
        oliveReadyToStart,
        setReadyToStart,

        setTokenLocation,
        setTokenMode,
        doTokenDamage,
    } = playersStore;

    const playerReadyToStart = color => color === PLAYER_TAN ? tanReadyToStart : oliveReadyToStart;
    const homeTokensByColor = color => color === PLAYER_TAN ? tanHomeTokens : oliveHomeTokens;
    const gameReadyToStart = tanReadyToStart && oliveReadyToStart && boardReadyToStart;

    return {
        occupiedCells,

        allTokens,
        tokenSummary,

        hashedBoardTokens,

        tanReadyToStart,
        oliveReadyToStart,
        playerReadyToStart,
        boardReadyToStart,
        gameReadyToStart,
        
        homeTokensByColor,
        boardTokensByColor: color => color === PLAYER_TAN ? tanBoardTokens : oliveBoardTokens,
        numSkirmishTokensByColor: color => color === PLAYER_TAN ? numTanSkirmishTokens : numOliveSkirmishTokens,
        numOliveSkirmishTokens,
        numTanSkirmishTokens,
        firstPlayer,
        canSetReadyToStart: color => homeTokensByColor(color).length === 0,

        setReadyToStart,
        setTokenLocation,
        setTokenMode,
        doTokenDamage,
    };
};
