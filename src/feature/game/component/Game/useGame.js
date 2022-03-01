import { useEffect } from 'react';

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

    useEffect(() => {
        const handlekeyDown = e => {
            if (e.key === 'Escape') {
                setClickedTokenId(null);
            }
        };

        window.addEventListener('keydown', handlekeyDown);

        return () => { window.removeEventListener('keydown', handlekeyDown); };
    }, [setClickedTokenId]);

    return {
        gameMode,
        setClickedTokenId,
        tokenSummary,
    };
};
