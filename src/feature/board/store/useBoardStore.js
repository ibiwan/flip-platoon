import { useRootStore } from 'util/rootStore';

export const useBoardStore = () => {
    const { boardStore } = useRootStore();

    const { hoveredBoardCell, setHoveredBoardCell } = boardStore;

    return {
        hoveredBoardCell,
        setHoveredBoardCell,
    };
};
