import { useGameStore } from 'feature/game';

import { usePlayersStore } from '../../store';

export const usePlayerSide = (color) => {
    const { selectedTokenId } = useGameStore();
    const { tokensByColor } = usePlayersStore();

    return {
        tokensByColor,
        selectedTokenId,
    };
};
