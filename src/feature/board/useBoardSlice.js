import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    selectHoveredBoardCell,
    setHoveredBoardCellAction,
} from './boardSlice';

export const useBoardSlice = () => {
    const dispatch = useDispatch()

    const hoveredBoardCell = useSelector(selectHoveredBoardCell)

    const actions = useMemo(() => bindActionCreators({
        setHoveredBoardCell: setHoveredBoardCellAction,
    }, dispatch), [dispatch]);

    return {
        setHoveredBoardCell: actions.setHoveredBoardCell,
        hoveredBoardCell,
    }
}
