import { useGameStore } from 'feature/game';

export const useStatus = () => {
    const {
        gameMode,
        inPlayingMode,
        inSetupMode,
        selectedToken,
        clickedToken,
        hoveredToken,
        draggedToken,
    } = useGameStore();

    return {
        gameMode,
        inSetupMode,
        inPlayingMode,
        selectedToken,
        clickedToken,
        hoveredToken,
        draggedToken,
    };
};
