import { useDrop } from "react-dnd"
import { useDispatch } from "react-redux"

import { ItemTypes } from "../../util/dragondrop/itemTypes"
import { ijkey } from "../../util"

import { useGameSlice } from "../game/useGameSlice"
import { usePlayerSlice } from "../player/usePlayerSlice"

export const useBoardCell = (i, j) => {
    const dispatch = useDispatch()

    const {
        selectedToken,
        validAttacks,
        validMoves,
        setSelectedToken,
    } = useGameSlice()

    const {
        hashedBoardTokens: hashedTokens,
        setTokenLocation,
    } = usePlayerSlice()

    const key = ijkey(i, j)

    const token = hashedTokens[key]

    const isMoveTarget = selectedToken?.id && validMoves.includes(key)
    const isAttackTarget = selectedToken?.id && validAttacks.includes(key)

    const moveSelectedTokenTo = (i, j) => {
        setTokenLocation({ token, i, j })
        dispatch(setSelectedToken(null))
    }

    const moveToken = (token) => {
        setSelectedToken(null)

        if (!isMoveTarget) {
            return
        }

        setTokenLocation({ token, i, j })
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
        isOver,
        dropRef,
        token,
        moveSelectedTokenTo,
        isMoveTarget,
        isAttackTarget,
    }
}
