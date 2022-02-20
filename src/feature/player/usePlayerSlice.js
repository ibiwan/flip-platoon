import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    selectAllTokens,
    selectPlayer,
    selectHashedBoardTokens,
    selectReadyToStart,
    setTokenLocationAction,
    setTokenModeAction,
} from './playersSlice';

export const usePlayerSlice = (color) => {
    const dispatch = useDispatch()

    const player = useSelector(selectPlayer(color))
    const allTokens = useSelector(selectAllTokens)
    const hashedBoardTokens = useSelector(selectHashedBoardTokens)
    const readyToStart = useSelector(selectReadyToStart)

    const actions = useMemo(() => bindActionCreators({
        setTokenLocation: setTokenLocationAction,
        setTokenMode:setTokenModeAction,
    }, dispatch), [dispatch]);

    return {
        ...actions,
        // actions.setTokenLocation
        // actions.setTokenMode
        player,
        allTokens,
        hashedBoardTokens,
        readyToStart,
    }
}
