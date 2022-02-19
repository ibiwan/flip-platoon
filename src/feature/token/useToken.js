import { bindActionCreators } from "@reduxjs/toolkit"
import { useMemo } from "react"
import { useDrag } from "react-dnd"
import { useDispatch } from "react-redux"
import { ItemTypes } from "../../util/dragondrop/itemTypes"
import { setHoverSelectedTokenId } from '../game/gameSlice'

export const useToken = (selectedToken, setSelectedToken) => {
    const dispatch = useDispatch()

    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: ItemTypes.TOKEN,
        item: () => {
            setSelectedToken(selectedToken.id);
            return selectedToken;
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        })
    }))

    const actions = useMemo(() => bindActionCreators({
        setHoverSelectedTokenId,
    }, dispatch), [dispatch])

    return { isDragging, dragRef, ...actions }
}
