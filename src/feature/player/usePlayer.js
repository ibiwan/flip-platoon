import { usePlayerSlice } from './usePlayerSlice';

export const usePlayer = (color) => {
    const { player } = usePlayerSlice(color);

    return {
        player,
    }
}
