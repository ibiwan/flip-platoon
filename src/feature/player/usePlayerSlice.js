import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedTokenId, setSelectedToken } from '../game/gameSlice';
import { selectPlayer } from './playersSlice';

export const usePlayerSlice = (color) => {
    const dispatch = useDispatch()

    const actions = useMemo(()=>bindActionCreators({
        setSelectedToken,
    }, dispatch), [dispatch])

    const player = useSelector(selectPlayer(color))
    const selectedTokenId = useSelector(selectSelectedTokenId)

    return {
        ...actions,
        player,
        selectedTokenId,
    }
}
