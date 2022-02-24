import { useGameSlice } from '../game/useGameSlice';
import { usePlayerSlice } from './usePlayerSlice';

export const usePlayerSide = (color) => {
    const { selectedTokenId } = useGameSlice();
    const { player } = usePlayerSlice(color);

    return {
        player,
        selectedTokenId,
    };
};
