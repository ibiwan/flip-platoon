import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    selectAllTokens,
    selectBoardTokens,
    selectHashedBoardTokens,
    selectPlayer,
    selectReadyToStart,
    setTokenLocationAction,
    setTokenModeAction,
    doTokenDamageAction,
} from './playersSlice';

export const usePlayersSlice = (color) => {
    const dispatch = useDispatch();

    const player = useSelector(selectPlayer(color));
    const allTokens = useSelector(selectAllTokens);
    const boardTokens = useSelector(selectBoardTokens);
    const hashedBoardTokens = useSelector(selectHashedBoardTokens);
    const readyToStart = useSelector(selectReadyToStart);

    const actions = useMemo(() => bindActionCreators({
        setTokenLocation: setTokenLocationAction,
        setTokenMode: setTokenModeAction,
        doTokenDamage: doTokenDamageAction,
    }, dispatch), [dispatch]);

    return {
        setTokenLocation: actions.setTokenLocation,
        setTokenMode: actions.setTokenMode,
        doTokenDamage: actions.doTokenDamage,
        player,
        allTokens,
        boardTokens,
        hashedBoardTokens,
        readyToStart,
    };
};
