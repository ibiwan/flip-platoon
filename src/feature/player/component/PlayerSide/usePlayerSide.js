import { useGameStore } from 'feature/game';

import { usePlayersStore } from '../../store';

export const usePlayerSide = (color) => {
    const { selectedTokenId } = useGameStore();
    const {
        homeTokensByColor,
        playerReadyToStart,
        setReadyToStart,
        canSetReadyToStart,
    } = usePlayersStore();

    const playerHomeTokens = homeTokensByColor(color);

    return {
        playerHomeTokens,
        selectedTokenId,
        readyToStart: playerReadyToStart(color),
        setReadyToStart: ready => setReadyToStart(color, ready),
        canSetReadyToStart: canSetReadyToStart(color),
    };
};
