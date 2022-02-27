import { useDrag } from 'react-dnd';

import { flipOf } from 'util/game';
import { ItemTypes } from 'util/dragondrop/itemTypes';
import { GAME_MODE_PLAYING, GAME_MODE_SETUP, TOKEN_REALM_BOARD, TURN_PHASE_FLIP } from 'util/consts';

import { useGameStore } from 'feature/game';
import { useTurnStore } from 'feature/turn';
import { usePlayersStore } from 'feature/player';

export const useToken = (displayedToken) => {
    const {
        gameMode,
        selectedTokenId,
        clickedTokenId,
        hoveredTokenId,
        draggedTokenId,
        setHoveredTokenId,
        setClickedTokenId,
        setDraggedTokenId,
    } = useGameStore();

    const {
        setTokenMode
    } = usePlayersStore();

    const {
        currentPlayer,
        hasFlipped,
        recordTokenTurnPhase,
    } = useTurnStore();

    const [{ isDragging }, dragRef, dragPreviewRef] = useDrag(() => ({
        type: ItemTypes.TOKEN,
        item: () => {
            setDraggedTokenId(displayedToken.id);

            return { tokenId: displayedToken.id };
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    const toggleTokenMode = (token) => {
        if (
            gameMode === GAME_MODE_PLAYING &&
            token.color !== currentPlayer
        ) {
            console.log(`not your turn, ${token.color}`);
            return;
        }

        if (hasFlipped(token.id)) {
            console.log('token already flipped this turn: ', token.id);
            return;
        }

        setTokenMode(token, flipOf(token.mode));
        recordTokenTurnPhase(token.id, TURN_PHASE_FLIP);
    };

    const isSelected = selectedTokenId === displayedToken.id;
    const isClicked = clickedTokenId === displayedToken.id;
    const isHovered = hoveredTokenId === displayedToken.id;
    const isDragged = draggedTokenId === displayedToken.id;
    const isOnBoard = displayedToken.realm === TOKEN_REALM_BOARD;
    const isMyTurn = currentPlayer === displayedToken.color;
    const inSetupMode = gameMode === GAME_MODE_SETUP;

    return {
        isDragging,
        dragRef,
        dragPreviewRef,
        toggleTokenMode,

        isSelected,

        setClickedTokenId,
        isClicked,

        setHoveredTokenId,
        isHovered,

        setDraggedTokenId,
        isDragged,

        isOnBoard,
        isMyTurn,
        inSetupMode,
    };
};
