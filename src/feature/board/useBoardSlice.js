import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedToken, selectSelectedTokenId, selectValidCells } from '../game/gameSlice';
import { selectBoardTokens } from './boardSlice';

export const useBoardSlice = () => {
    const dispatch = useDispatch()

    const actions = useMemo(() => bindActionCreators({
        setSelectedToken
    }, dispatch), [dispatch])

    const boardTokens = useSelector(selectBoardTokens)
    const selectedTokenId = useSelector(selectSelectedTokenId)

    const validCells = useSelector(selectValidCells)

    return {
        ...actions,
        boardTokens,
        selectedTokenId,
        validCells,
    }
}
