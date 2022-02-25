import { useDrag } from 'react-dnd';
import { batch } from 'react-redux';

import { flipOf } from 'util/game';
import { ItemTypes } from 'util/dragondrop/itemTypes';
import { TOKEN_REALM_BOARD, TURN_PHASE_FLIP } from 'util/consts';

import { useGameSlice } from 'feature/game';
import { useTurnStore } from 'feature/turn';
import { usePlayersSlice } from 'feature/player';

export const useToken = (displayedToken) => {
    const {
        selectedToken,
        clickedToken,
        hoveredToken,
        draggedToken,
        setHoveredTokenId,
        setClickedTokenId,
        setDraggedTokenId,
    } = useGameSlice();

    const {
        setTokenMode
    } = usePlayersSlice();

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

        batch(() => {
            setTokenMode({ token, mode: flipOf(token.mode) });
            recordTokenTurnPhase(token.id, TURN_PHASE_FLIP);
        });
    };

    const isSelected = selectedToken?.id === displayedToken.id;
    const isClicked = clickedToken?.id === displayedToken.id;
    const isHovered = hoveredToken?.id === displayedToken.id;
    const isDragged = draggedToken?.id === displayedToken.id;
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
