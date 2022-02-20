import { useEffect } from 'react';
import { Flipper } from 'react-flip-toolkit'

import { PlayerSide } from '../player/PlayerSide';
import { Board } from '../board/Board';
import { Status } from '../status/Status';
import { PLAYER_OLIVE, PLAYER_TAN } from '../../util/consts';

import { useGame } from './useGame'
import { useSetSelectedToken } from './useSetSelectedToken';

import "./Game.css"

export const Game = () => {
    const { tokenSummary } = useGame()
    const { setSelectedToken } = useSetSelectedToken()

    useEffect(() => {
        const handlekeyDown = e => {
            if (e.key === 'Escape') {
                setSelectedToken(null)
            }
        }

        window.addEventListener('keydown', handlekeyDown);

        return () => { window.removeEventListener('keydown', handlekeyDown); }
    }, [setSelectedToken])

    return (
        <Flipper flipKey={tokenSummary}>
            <div id="game"
                onClick={() => setSelectedToken(null)}
            >
                <PlayerSide color={PLAYER_OLIVE} />
                <Board />
                <PlayerSide color={PLAYER_TAN} />
                <Status />
            </div>
        </Flipper>
    )
}
