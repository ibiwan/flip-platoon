import { useEffect } from 'react';
import { Flipper } from 'react-flip-toolkit';

import { PLAYER_OLIVE, PLAYER_TAN } from 'util/consts';

import { PlayerSide } from 'feature/player';
import { Board } from 'feature/board';
import { Status } from 'feature/status';

import { useGame } from './useGame';
import './Game.css';

export const Game = () => {
    const {
        tokenSummary,
        setClickedTokenId,
    } = useGame();

    useEffect(() => {
        const handlekeyDown = e => {
            if (e.key === 'Escape') {
                setClickedTokenId(null);
            }
        };

        window.addEventListener('keydown', handlekeyDown);

        return () => { window.removeEventListener('keydown', handlekeyDown); };
    }, [setClickedTokenId]);

    return (
        <Flipper flipKey={tokenSummary}>
            <div id='game'
                onClick={() => setClickedTokenId(null)}
            >
                <PlayerSide color={PLAYER_OLIVE} />
                <Board />
                <PlayerSide color={PLAYER_TAN} />
                <Status />
            </div>
        </Flipper>
    );
};
