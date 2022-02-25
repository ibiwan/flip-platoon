import { useMemo } from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import {
    selectGameMode,
    selectOccupiedCells,
    selectValidAttacks,
    selectValidMoves,
    selectClickedToken,
    selectHoveredToken,
    selectDraggedToken,
    selectSelectedToken,
    selectSelectedTokenId,
    setClickedTokenIdAction,
    setHoveredTokenIdAction,
    setDraggedTokenIdAction,
    setGameModeAction,
} from './gameSlice';

export const useGameSlice = () => {
    const dispatch = useDispatch();

    const gameMode = useSelector(selectGameMode);
    const selectedToken = useSelector(selectSelectedToken);
    const selectedTokenId = useSelector(selectSelectedTokenId);
    const clickedToken = useSelector(selectClickedToken);
    const hoveredToken = useSelector(selectHoveredToken);
    const draggedToken = useSelector(selectDraggedToken);
    const occupiedCells = useSelector(selectOccupiedCells);
    const validAttacks = useSelector(selectValidAttacks);
    const validMoves = useSelector(selectValidMoves);

    const actions = useMemo(() => bindActionCreators({
        setClickedTokenId: setClickedTokenIdAction,
        setHoveredTokenId: setHoveredTokenIdAction,
        setDraggedTokenId: setDraggedTokenIdAction,
        setGameMode: setGameModeAction,
    }, dispatch), [dispatch]);

    return {
        setClickedTokenId: actions.setClickedTokenId,
        setHoveredTokenId: actions.setHoveredTokenId,
        setDraggedTokenId: actions.setDraggedTokenId,
        setGameMode: actions.setGameMode,

        gameMode,
        clickedToken,
        hoveredToken,
        draggedToken,
        selectedToken,
        selectedTokenId,
        occupiedCells,
        validAttacks,
        validMoves,
    };
};
