import { useGameStore } from 'feature/game';

import { usePlayersStore } from '../../store';

export const usePlayerSide = (color) => {
    const { selectedTokenId } = useGameStore();
    const {
        tokensByColor,
        readyToStart,
        setReadyToStart,
    } = usePlayersStore();

    const playerHomeTokens = tokensByColor(color);

    return {
        playerHomeTokens,
        selectedTokenId,
        readyToStart,
        setReadyToStart,
        canSetReadyToStart: playerHomeTokens.length === 0,
    };
};
