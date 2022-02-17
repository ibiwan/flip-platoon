
import { PlayerSide } from '../player/PlayerSide';
import { Board } from '../board/Board';
import { Status } from '../status/Status';
import { PLAYER_OLIVE, PLAYER_TAN } from '../../util/consts';
import { useGame } from './useGame'

import "./Game.css"
import { useEffect } from 'react';

export const Game = () => {
    const { setSelectedToken } = useGame()

    const handlekeyDown = e => {
        if (e.key === 'Escape') {
            setSelectedToken(null)
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handlekeyDown);

        return () => { window.removeEventListener('keydown', handlekeyDown); }
    }, [])


    return (
        <div id="game"
            onClick={() => setSelectedToken(null)}
        >
            <PlayerSide color={PLAYER_OLIVE} />
            <Board />
            <PlayerSide color={PLAYER_TAN} />
            <Status />
        </div>
    )
}
