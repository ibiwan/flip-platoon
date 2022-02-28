import { 
    GAME_MODE_PLAYING,
     PLAYER_OLIVE, PLAYER_TAN,
     } from 'util/consts';

import { useGameStore } from 'feature/game';
import { usePlayersStore } from 'feature/player';
import { useTurnStore } from 'feature/turn';

export const useStatus = () => {
    const {
        gameMode,
        inPlayingMode,
        inSetupMode,
        setGameMode,
        selectedToken,
        clickedToken,
        hoveredToken,
        draggedToken,
        setClickedTokenId,
    } = useGameStore();

    const {
        currentPlayer,
        turnTokens,
        startTurn,
    } = useTurnStore();

    const {
        readyToStart
    } = usePlayersStore();

    const startGame = () => setGameMode(GAME_MODE_PLAYING);
    const startOliveTurn = () => {
        startTurn(PLAYER_OLIVE);
        setClickedTokenId(null);
    };
    const startTanTurn = () => {
        startTurn(PLAYER_TAN);
        setClickedTokenId(null);
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
