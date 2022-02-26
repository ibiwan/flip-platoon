import { 
    GAME_MODE_PLAYING, GAME_MODE_SETUP,
     PLAYER_OLIVE, PLAYER_TAN,
     } from 'util/consts';

import { useGameStore } from 'feature/game';
import { usePlayersStore } from 'feature/player';
import { useTurnStore } from 'feature/turn';

export const useStatus = () => {
    const {
        gameMode,
        setGameMode,
        selectedToken,
        clickedToken,
        hoveredToken,
        draggedToken,
    } = useGameStore();

    const {
        currentPlayer,
        turnTokens,
        startTurn,
    } = useTurnStore();

    const {
        readyToStart
    } = usePlayersStore();

    const inSetupMode = gameMode === GAME_MODE_SETUP;
    const inPlayingMode = gameMode === GAME_MODE_PLAYING;

    const startGame = () => setGameMode(GAME_MODE_PLAYING);
    const startOliveTurn = () => {
        startTurn(PLAYER_OLIVE);
    };
    const startTanTurn = () => {
        startTurn(PLAYER_TAN);
    };

    return {
        gameMode,
        inSetupMode,
        inPlayingMode,
        readyToStart,
        startGame,
        startOliveTurn,
        startTanTurn,
        selectedToken,
        clickedToken,
        hoveredToken,
        draggedToken,
        currentPlayer,
        turnTokens,
    };
};
