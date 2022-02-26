import { useDrag } from 'react-dnd';

import { flipOf } from 'util/game';
import { ItemTypes } from 'util/dragondrop/itemTypes';
import { TOKEN_REALM_BOARD, TURN_PHASE_FLIP } from 'util/consts';

import { useGameStore } from 'feature/game';
import { useTurnStore } from 'feature/turn';
import { usePlayersStore } from 'feature/player';

export const useToken = (displayedToken) => {
    const {
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
        canFlip,
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
        if (!canFlip(token.id)) {
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
    };
};
