import { usePlayerSlice } from './usePlayerSlice';

export const usePlayer = (color) => {
    const { player, selectedTokenId, setSelectedToken } = usePlayerSlice(color);

    return {
        player,
        selectedTokenId,
        setSelectedToken,
    }
}
