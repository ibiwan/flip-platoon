
import { PlayerSide } from '../player/PlayerSide';
import { Board } from '../board/Board';
import { Status } from '../status/Status';
import { PLAYER_OLIVE, PLAYER_TAN } from '../../util/consts';
import { useGame } from './useGame'

import "./Game.css"

export const Game = () => {
    const { a } = useGame()

    return (
        <div id="game">
            <PlayerSide color={PLAYER_OLIVE} />
            <Board />
            <PlayerSide color={PLAYER_TAN} />
            <Status />
        </div>
    )
}