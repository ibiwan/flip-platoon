import { useMemo } from 'react';
import { useGameSlice } from '../../store';
import { usePlayersSlice } from 'feature/player';

export const useGame = () => {
    const {
        gameMode,
        setClickedTokenId,
    } = useGameSlice();
    const { allTokens } = usePlayersSlice();

    const tokenSummary = useMemo(() => {
        const summaries = allTokens.map(({ id, realm, position }) => ({ id, realm, position }));
        return JSON.stringify(summaries);
    }, [allTokens]);

    return {
        gameMode,
        setClickedTokenId,
        tokenSummary,
    };
};
