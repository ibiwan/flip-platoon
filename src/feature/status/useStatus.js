import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectGameMode } from '../game/gameSlice';

export const useStatus = () => {
    const dispatch = useDispatch()

    // const actions = useMemo(bindActionCreators({

    // }, dispatch), [dispatch])

    const gameMode = useSelector(selectGameMode)

    return {
        gameMode,
    }
}
