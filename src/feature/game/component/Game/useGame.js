import { useMemo } from 'react';

import { usePlayersSlice } from 'feature/player';

import { useGameSlice } from '../../store';

export const useGame = () => {
    const {
        gameMode,
        setClickedTokenId,
    } = useGameSlice();
    const { allTokens } = usePlayersSlice();

    const tokenSummary = useMemo(() => {
        const summaries = allTokens.map(
            ({ id, realm, position }) =>
                ({ id, realm, position })
        );
        return JSON.stringify(summaries);
    }, [allTokens]);

    return {
        gameMode,
        setClickedTokenId,
        tokenSummary,
    };
};
