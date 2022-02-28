import { makeAutoObservable } from 'mobx';

import { GAME_MODE_PLAYING, GAME_MODE_SETUP } from 'util/consts';

let gameStore;
const initialState = {
    gameMode: GAME_MODE_SETUP,
    clickedTokenId: null,
    hoveredTokenId: null,
    draggedTokenId: null,

    get selectedTokenId() { return this.draggedTokenId ?? this.clickedTokenId ?? this.hoveredTokenId; },
    get inSetupMode() { return this.gameMode === GAME_MODE_SETUP; },
    get inPlayingMode() { return this.gameMode === GAME_MODE_PLAYING; },

    setGameMode: gameMode => gameStore.gameMode = gameMode,
    setClickedTokenId: clickedTokenId => gameStore.clickedTokenId = clickedTokenId,
    setHoveredTokenId: hoveredTokenId => gameStore.hoveredTokenId = hoveredTokenId,
    setDraggedTokenId: draggedTokenId => gameStore.draggedTokenId = draggedTokenId,
};

export const getGameStore = () => {
    gameStore = gameStore ??
        makeAutoObservable(initialState);

    return gameStore;
};
