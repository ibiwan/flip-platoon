import { TOKEN_REALM_BOARD } from 'util/consts';

import { useGameStore } from 'feature/game';
import { useTurnStore } from 'feature/turn';
import { useTokenDrag } from 'util/dragondrop/useTokenDrag';
import { useTokenFlips } from 'feature/token/hooks/useTokenFlips';

export const useToken = (displayedToken) => {
    const {
        id,
        health,
        maxHealth,
    } = displayedToken;

    const {
        inPlayingMode,
        inSetupMode,
        selectedTokenId,
        clickedTokenId,
        setHoveredTokenId,
        setClickedTokenId,
        setDraggedTokenId,
    } = useGameStore();

    const {
        currentPlayer,
    } = useTurnStore();

    const [{ isDragging }, dragRef, dragPreviewRef] = useTokenDrag(
        displayedToken, setDraggedTokenId
    );

    const { toggleTokenMode } = useTokenFlips(displayedToken);

    const isSelected = selectedTokenId === displayedToken.id;
    const isClicked = clickedTokenId === displayedToken.id;
    const isOnBoard = displayedToken.realm === TOKEN_REALM_BOARD;
    const isMyTurn = currentPlayer === displayedToken.color;
    const pctHealth = health * 100 / maxHealth;

    const onClick = e => {
        if (inPlayingMode && !isMyTurn) {
            return;
        }

        e.stopPropagation();

        if (!isClicked && (inSetupMode || isMyTurn)
        ) {
            setClickedTokenId(id);
        } else {
            toggleTokenMode(displayedToken);
            setClickedTokenId(null);
        }
    };

    const onMouseEnter = () => {
        setHoveredTokenId(id);
    };

    const onMouseLeave = () => {
        setHoveredTokenId(null);
    };

    return {
        isDragging,
        dragRef,
        dragPreviewRef,

        isSelected,
        isOnBoard,
        isMyTurn,
        inSetupMode,

        pctHealth,

        onClick,
        onMouseEnter,
        onMouseLeave,
    };
};
