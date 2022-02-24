import { useMemo } from "react";
import { useGameSlice } from "./useGameSlice";
import { usePlayerSlice } from '../player/usePlayerSlice';

export const useGame = () => {
    const {
        gameMode,
        setClickedTokenId,
    } = useGameSlice();
    const { allTokens } = usePlayerSlice();

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
