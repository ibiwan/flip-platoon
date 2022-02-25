import { useGameSlice } from 'feature/game';

import { usePlayersSlice } from '../../store';

export const usePlayerSide = (color) => {
    const { selectedTokenId } = useGameSlice();
    const { player } = usePlayersSlice(color);

    return {
        player,
        selectedTokenId,
    };
};
