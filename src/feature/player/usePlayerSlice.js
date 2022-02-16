import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectGameMode } from '../game/gameSlice';
import { selectPlayer } from './playersSlice';

export const usePlayerSlice = (color) => {
    const dispatch = useDispatch()

    // const actions = useMemo(bindActionCreators({

    // }, dispatch), [dispatch])

    const player = useSelector(selectPlayer(color))

    return {
        player,
    }
}
