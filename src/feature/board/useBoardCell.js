import { useDrop } from "react-dnd"

import { ItemTypes } from "../../util/dragondrop/itemTypes"
import { ijkey } from "../../util"

import { useGameSlice } from "../game/useGameSlice"
import { usePlayerSlice } from "../player/usePlayerSlice"
import { useBoardSlice } from "../board/useBoardSlice"

export const useBoardCell = (i, j) => {
    const {
        selectedToken,
        validAttacks,
        validMoves,
        setSelectedToken,
    } = useGameSlice()

    const {
        hashedBoardTokens,
        setTokenLocation,
    } = usePlayerSlice()

    const {
        hoverSelectedBoardCell,
        setHoverSelectedBoardCell
    } = useBoardSlice()

    const key = ijkey(i, j)

    const token = hashedBoardTokens[key]

    const isMoveTarget = selectedToken?.id && validMoves.includes(key)
    const isAttackTarget = selectedToken?.id && validAttacks.includes(key)
    const isHovered = hoverSelectedBoardCell === key

    const moveSelectedTokenTo = (i, j) => {
        setTokenLocation({ token:selectedToken, i, j })

        setSelectedToken(null)
        setHoverSelectedBoardCell(null)
    }

    const moveToken = (token) => {
        setSelectedToken(null)

        if (!isMoveTarget) {
            return
        }

        setTokenLocation({ token, i, j })

        setSelectedToken(null)
        setHoverSelectedBoardCell(null)
    }

    const [{ isOver }, dropRef] = useDrop(
        () => ({
            accept: ItemTypes.TOKEN,
            drop: (token) => moveToken(token),
            collect: (monitor) => ({
                isOver: !!monitor.isOver()
            })
        }),
        [i, j, isMoveTarget]
    )
    return {
        key,
        isOver,
        dropRef,
        token,
        moveSelectedTokenTo,
        isMoveTarget,
        isAttackTarget,
        isHovered,
        setHoverSelectedBoardCell,
    }
}
