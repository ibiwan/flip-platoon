import { usePlayerSlice } from './usePlayerSlice';
import { useGameSlice } from '../game/useGameSlice';

export const usePlayer = (color) => {
    const { player, selectedTokenId, setSelectedToken } = usePlayerSlice(color);
    // const {
    //     selectToken,
    // } = useGameSlice()

    return {
        player,
        selectedTokenId,
        setSelectedToken,
    }
}
