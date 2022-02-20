import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    selectGameMode,
    selectSelectedToken,
    selectSelectedTokenId,
    selectValidAttacks,
    selectValidMoves,
    selectClickSelectedToken,
    selectHoverSelectedToken,
    setHoverSelectedTokenIdAction,
} from './gameSlice';

export const useGameSlice = () => {
    const dispatch = useDispatch()

    const gameMode = useSelector(selectGameMode)
    const selectedToken = useSelector(selectSelectedToken)
    const selectedTokenId = useSelector(selectSelectedTokenId)
    const validAttacks = useSelector(selectValidAttacks)
    const validMoves = useSelector(selectValidMoves)
    const clickSelectedToken = useSelector(selectClickSelectedToken)
    const hoverSelectedToken = useSelector(selectHoverSelectedToken)

    const actions = useMemo(() => bindActionCreators({
        setHoverSelectedTokenId: setHoverSelectedTokenIdAction,
    }, dispatch), [dispatch]);

    return {
        ...actions,
        // actions.setHoverSelectedTokenId
        gameMode,
        selectedToken,
        selectedTokenId,
        clickSelectedToken,
        hoverSelectedToken,
        validAttacks,
        validMoves,
    }
}
