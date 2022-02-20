import { useDrag } from "react-dnd"

import { useSetSelectedToken } from "../game/useSetSelectedToken"
import { useGameSlice } from "../game/useGameSlice"
import { usePlayerSlice } from "../player/usePlayerSlice"

import { ItemTypes } from "../../util/dragondrop/itemTypes"
import { flipOf } from "../player/playerSliceUtils"

export const useToken = (token) => {
    const { setSelectedToken } = useSetSelectedToken()
    const {
        clickSelectedToken,
        hoverSelectedToken,
        setHoverSelectedTokenId,
    } = useGameSlice()
    const {
        setTokenMode
    } = usePlayerSlice()

    const [{ isDragging }, dragRef] = useDrag(() => ({
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

    return {
        isDragging,
        dragRef,
        toggleTokenMode,
        clickSelectedToken,
        hoverSelectedToken,
        setHoverSelectedTokenId,
    }
}
