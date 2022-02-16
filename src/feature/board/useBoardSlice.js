import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectBoardPieces } from './boardSlice';

export const useBoardSlice = () => {
    const dispatch = useDispatch()

    // const actions = useMemo(bindActionCreators({

    // }, dispatch), [dispatch])

    const boardPieces = useSelector(selectBoardPieces)

    return {
        boardPieces,
    }
}
