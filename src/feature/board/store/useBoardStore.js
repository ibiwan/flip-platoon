import { runInAction } from 'mobx';
import { useRootStore } from 'util/rootStore';

export const useBoardStore = () => {
    const store = useRootStore();
    const hoveredBoardCell = store.boardStore.hoveredBoardCell;
    const setHoveredBoardCell = id => runInAction(() => store.boardStore.hoveredBoardCell = id);

    return {
        hoveredBoardCell,
        setHoveredBoardCell,
    };
};
