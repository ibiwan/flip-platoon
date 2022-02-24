import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePlayerSlice } from '../player/usePlayerSlice';
import {
    startTurnAction,
    recordTokenTurnPhaseAction,
    selectCurrentPlayer,
    selectTurnTokens,
} from './turnSlice';

export const useTurnSlice = () => {
    const dispatch = useDispatch();

    const {
        boardTokens
    } = usePlayerSlice();

    const currentPlayer = useSelector(selectCurrentPlayer);
    const turnTokens = useSelector(selectTurnTokens);

    const actions = useMemo(() => bindActionCreators({
        startTurn: startTurnAction,
        recordTokenTurnPhase: recordTokenTurnPhaseAction,
    }, dispatch), [dispatch]);

    const startTurn = (color) => {
        const playerTokens =
            boardTokens.filter(t => t.color === color);
        actions.startTurn({
            currentPlayer: color,
            turnTokens: playerTokens.map(t => t.id),
        });
    };

    const canMove = (tokenId) => !turnTokens?.find(t => t.id === tokenId)?.moveDone;
    const canAttack = (tokenId) => !turnTokens?.find(t => t.id === tokenId)?.attackDone;
    const canFlip = (tokenId) => !turnTokens?.find(t => t.id === tokenId)?.flipDone;

    return {
        recordTokenTurnPhase: actions.recordTokenTurnPhase,
        currentPlayer,
        turnTokens,
        startTurn,
        canMove,
        canAttack,
        canFlip,
    };
};
