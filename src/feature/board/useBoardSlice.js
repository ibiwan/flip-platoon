import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setSelectedToken,
    selectValidCells,
    selectSelectedToken,
} from '../game/gameSlice';
import {
    selectBoardTokens,
    moveTokenTo,
} from '../player/playersSlice'

export const useBoardSlice = () => {
    const dispatch = useDispatch()

    const actions = useMemo(() => bindActionCreators({
        setSelectedToken
    }, dispatch), [dispatch])

    const boardTokens = useSelector(selectBoardTokens)
    const selectedToken = useSelector(selectSelectedToken)

    const validCells = useSelector(selectValidCells)

    const moveSelectedTokenTo = (i, j) => {
        dispatch(moveTokenTo({ token: selectedToken, i, j }))
    }

    return {
        ...actions,
        boardTokens,
        selectedTokenId: selectedToken?.id,
        validCells,
        moveSelectedTokenTo,
    }
}
