import { useDispatch, useSelector } from 'react-redux';
import { GAME_MODE_PLAYING, GAME_MODE_SETUP } from '../../util/consts';
import { selectGameMode, setGameMode } from '../game/gameSlice';
import { selectReadyToStart } from '../player/playersSlice';

export const useStatus = () => {
    const dispatch = useDispatch()

    const gameMode = useSelector(selectGameMode)

    const readyToStart = useSelector(selectReadyToStart)

    const inSetupMode = gameMode === GAME_MODE_SETUP

    const startGame = () => {
        dispatch(setGameMode(GAME_MODE_PLAYING))
    }

    return {
        gameMode,
        inSetupMode,
        readyToStart,
        startGame,
    }
}
