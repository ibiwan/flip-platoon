import { useRootStore } from 'util/rootStore';
import {
    setHoveredBoardCell,
} from './boardStore';

export const useBoardStore = () => {
    const { boardStore } = useRootStore();
    
    const hoveredBoardCell = boardStore.hoveredBoardCell;

    return {
        hoveredBoardCell,
        setHoveredBoardCell,
    };
};
