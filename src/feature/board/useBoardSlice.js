import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    selectHoverSelectedBoardCell,
    setHoverSelectedBoardCellAction,
} from './boardSlice';

export const useBoardSlice = () => {
    const dispatch = useDispatch()

    const hoverSelectedBoardCell = useSelector(selectHoverSelectedBoardCell)

    const actions = useMemo(() => bindActionCreators({
        setHoverSelectedBoardCell: setHoverSelectedBoardCellAction,
    }, dispatch), [dispatch]);

    return {
        hoverSelectedBoardCell,
        setHoverSelectedBoardCell: actions.setHoverSelectedBoardCell,
    }
}
