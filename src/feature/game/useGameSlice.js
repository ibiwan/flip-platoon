import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    selectGameMode,
    selectSelectedToken,
    selectSelectedTokenId,
    selectOccupiedCells,
    selectValidAttacks,
    selectValidMoves,
    selectClickSelectedToken,
    selectHoverSelectedToken,

    setHoverSelectedTokenIdAction,
    setSelectedTokenAction,
    setGameModeAction,
} from './gameSlice';

export const useGameSlice = () => {
    const dispatch = useDispatch()

    const gameMode = useSelector(selectGameMode)
    const selectedToken = useSelector(selectSelectedToken)
    const selectedTokenId = useSelector(selectSelectedTokenId)
    const occupiedCells = useSelector(selectOccupiedCells)
    const validAttacks = useSelector(selectValidAttacks)
    const validMoves = useSelector(selectValidMoves)
    const clickSelectedToken = useSelector(selectClickSelectedToken)
    const hoverSelectedToken = useSelector(selectHoverSelectedToken)

    const actions = useMemo(() => bindActionCreators({
        setHoverSelectedTokenId: setHoverSelectedTokenIdAction,
        setSelectedToken: setSelectedTokenAction,
        setGameMode: setGameModeAction,
    }, dispatch), [dispatch]);

    return {
        setHoverSelectedTokenId: actions.setHoverSelectedTokenId,
        setSelectedToken: actions.setSelectedToken,
        setGameMode: actions.setGameMode,
        gameMode,
        selectedToken,
        selectedTokenId,
        occupiedCells,
        clickSelectedToken,
        hoverSelectedToken,
        validAttacks,
        validMoves,
    }
}
