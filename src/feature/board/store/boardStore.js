import {
    makeAutoObservable,
} from 'mobx';


let boardStore;
let initialState = {
    hoveredBoardCell: null,

    setHoveredBoardCell: id => boardStore.hoveredBoardCell = id,
};

export const getBoardStore = () => {
    boardStore = boardStore ??
        makeAutoObservable(initialState);

    return boardStore;
};
