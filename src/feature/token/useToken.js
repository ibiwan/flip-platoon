import { useDrag } from "react-dnd"

import { useGameSlice } from "../game/useGameSlice"
import { usePlayerSlice } from "../player/usePlayerSlice"

import { ItemTypes } from "../../util/dragondrop/itemTypes"
import { flipOf } from "../player/playerSliceUtils"
import { TOKEN_REALM_BOARD } from "../../util/consts"

export const useToken = (displayedToken) => {
    const {
        selectedToken,
        clickedToken,
        hoveredToken,
        draggedToken,
        setHoveredTokenId,
        setClickedTokenId,
        setDraggedTokenId,
    } = useGameSlice()

    const {
        setTokenMode
    } = usePlayerSlice()

    const [{ isDragging }, dragRef, dragPreviewRef] = useDrag(() => ({
        type: ItemTypes.TOKEN,
        item: () => {
            setDraggedTokenId(displayedToken.id)

            return { tokenId: displayedToken.id }
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }))

    const toggleTokenMode = (token) => {
        setTokenMode({ token, mode: flipOf(token.mode) })
    }

    const isSelected = selectedToken?.id === displayedToken.id
    const isClicked = clickedToken?.id === displayedToken.id;
    const isHovered = hoveredToken?.id === displayedToken.id;
    const isDragged = draggedToken?.id === displayedToken.id;
    const isOnBoard = displayedToken.realm === TOKEN_REALM_BOARD

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
    }
}
