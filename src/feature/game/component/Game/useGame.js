import { usePlayersStore } from 'feature/player';

import { useGameStore } from '../../store';

export const useGame = () => {
    const {
        gameMode,
        setClickedTokenId,
    } = useGameStore();

    const {
        tokenSummary,
    } = usePlayersStore();

    return {
        gameMode,
        setClickedTokenId,
        tokenSummary,
    };
};
