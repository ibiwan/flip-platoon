import { useDrag } from 'react-dnd';

import { useGameSlice } from 'feature/game';
import { usePlayersSlice } from 'feature/player';

import { ItemTypes } from 'util/dragondrop/itemTypes';
import { flipOf } from 'util/game';
import { TOKEN_REALM_BOARD, TURN_PHASE_FLIP } from 'util/consts';
import { useTurnSlice } from 'feature/turn';

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
    } = useTurnSlice();

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
        // console.log({ canFlip: canFlip(token.id) });
        if(!canFlip(token.id)){
            console.log('token already flipped this turn: ', token.id);
            return;
        }

        setTokenMode({ token, mode: flipOf(token.mode) });
        recordTokenTurnPhase({ tokenId: token.id, phase: TURN_PHASE_FLIP });
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
