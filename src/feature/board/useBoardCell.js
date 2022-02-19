import { useDrop } from "react-dnd"
import { ItemTypes } from "../../util/dragondrop/itemTypes"
import { useBoardSlice } from "./useBoardSlice"

export const useBoardCell = (i, j, isTarget) => {
    const {
        moveTokenTo,
        setSelectedToken,
    } = useBoardSlice()

    const moveToken = (token) => {
        setSelectedToken(null)

        if (!isTarget) {
            return
        }

        moveTokenTo(token, i, j)
    }

    const [{ isOver }, dropRef] = useDrop(
        () => ({
            accept: ItemTypes.TOKEN,
            drop: (token) => moveToken(token),
            collect: (monitor) => ({
                isOver: !!monitor.isOver()
            })
        }),
        [i, j, isTarget]
    )
    return {
        isOver,
        dropRef,
    }
}
