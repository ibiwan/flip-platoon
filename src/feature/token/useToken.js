import { useDrag } from "react-dnd"

import { useGameSlice } from "../game/useGameSlice"
import { usePlayerSlice } from "../player/usePlayerSlice"

import { ItemTypes } from "../../util/dragondrop/itemTypes"
import { flipOf } from "../player/playerSliceUtils"
import { TOKEN_POSITION_HOME } from "../../util/consts"

export const useToken = (token) => {
    const {
        selectedToken,
        clickSelectedToken,
        hoverSelectedToken,
        setHoverSelectedTokenId,
        setSelectedToken,
    } = useGameSlice()

    const {
        setTokenMode
    } = usePlayerSlice()

    const [{ isDragging }, dragRef, dragPreviewRef] = useDrag(() => ({
        type: ItemTypes.TOKEN,
        item: () => {
            setSelectedToken(token.id)
            return token;
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        })
    }))

    const toggleTokenMode = (token) => {
        setTokenMode({ token, mode: flipOf(token.mode) })
    }

    const selected = selectedToken?.id === token.id
    const clickSelected = clickSelectedToken?.id === token.id;
    const hoverSelected = hoverSelectedToken?.id === token.id;
    const onBoard = token.position !== TOKEN_POSITION_HOME

    return {
        isDragging,
        dragRef,
        dragPreviewRef,
        toggleTokenMode,
        selected,
        onBoard,
        clickSelected,
        hoverSelected,
        setSelectedToken,
        setHoverSelectedTokenId,
    }
}
