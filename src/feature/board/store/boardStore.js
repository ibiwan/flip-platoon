import {
    makeAutoObservable,
    runInAction,
} from 'mobx';

let boardStore;
let initialState = {
    hoveredBoardCell: null,
};

export const getBoardStore = () => {
    boardStore = boardStore ??
        makeAutoObservable(initialState);

    return boardStore;
};

export const setHoveredBoardCell = id =>
    runInAction(() =>
        boardStore.hoveredBoardCell = id
    );
