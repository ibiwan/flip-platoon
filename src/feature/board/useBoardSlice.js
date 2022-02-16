import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectBoardTokens } from './boardSlice';

export const useBoardSlice = () => {
    const dispatch = useDispatch()

    // const actions = useMemo(bindActionCreators({

    // }, dispatch), [dispatch])

    const boardTokens = useSelector(selectBoardTokens)

    return {
        boardTokens,
    }
}
