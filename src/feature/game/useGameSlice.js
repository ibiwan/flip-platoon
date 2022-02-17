import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectGameMode, setSelectedToken } from './gameSlice';

export const useGameSlice = () => {
    const dispatch = useDispatch()

    const actions = useMemo(()=>bindActionCreators({
        setSelectedToken,
    }, dispatch), [dispatch])

    // const selectToken = id => dispatch(setSelectedToken(id))

    const gameMode = useSelector(selectGameMode)

    return {
        ...actions,
        gameMode,
    }
}
