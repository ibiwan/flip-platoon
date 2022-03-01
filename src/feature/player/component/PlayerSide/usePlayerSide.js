import { usePlayersStore } from '../../store';
import { useGameStore } from 'feature/game';

export const usePlayerSide = (color) => {
    const { selectedTokenId } = useGameStore();
    const {
        homeTokensByColor,
        playerReadyToStart,
        setReadyToStart,
        canSetReadyToStart,
    } = usePlayersStore();

    const {
        inSetupMode,
        setSelectedToken,
    } = useGameStore();

    const playerHomeTokens = homeTokensByColor(color);

    return {
        inSetupMode,
        setSelectedToken,
        playerHomeTokens,
        selectedTokenId,
        readyToStart: playerReadyToStart(color),
        setReadyToStart: ready => setReadyToStart(color, ready),
        canSetReadyToStart: canSetReadyToStart(color),
    };
};
