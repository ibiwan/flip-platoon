import { makeAutoObservable } from 'mobx';

export const makeBoardStore = () => makeAutoObservable({
    hoveredBoardCell: null,
});
