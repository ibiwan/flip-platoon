import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllTokens } from '../player/playersSlice';
import { selectGameMode, setSelectedToken } from './gameSlice';

export const useGameSlice = () => {
    const dispatch = useDispatch()

    const actions = useMemo(() => bindActionCreators({
        setSelectedToken,
    }, dispatch), [dispatch])

    const gameMode = useSelector(selectGameMode)

    const allTokens = useSelector(selectAllTokens)

    return {
        ...actions,
        gameMode,
        allTokens,
    }
}
