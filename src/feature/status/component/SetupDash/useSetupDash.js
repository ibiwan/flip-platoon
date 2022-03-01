import {
    GAME_MODE_PLAYING,
} from 'util/consts';

import { useGameStore } from 'feature/game';
import { usePlayersStore } from 'feature/player';

export const useSetupDash = () => {
    const {
        setGameMode,
    } = useGameStore();

    const {
        tanReadyToStart,
        oliveReadyToStart,
        boardReadyToStart,
        gameReadyToStart,
        numOliveSkirmishTokens,
        numTanSkirmishTokens,
        firstPlayer,
    } = usePlayersStore();

    const startGame = e => {
        e.stopPropagation();

        setGameMode(GAME_MODE_PLAYING);
    };

    return {
        tanReadyToStart,
        oliveReadyToStart,
        boardReadyToStart,
        gameReadyToStart,
        numOliveSkirmishTokens,
        numTanSkirmishTokens,
        firstPlayer,
        startGame,
    };
};
