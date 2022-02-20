import { useDrop } from "react-dnd"
import { useDispatch } from "react-redux"

import { ItemTypes } from "../../util/dragondrop/itemTypes"
import { ijkey } from "../../util"

import { useSetSelectedToken } from '../game/useSetSelectedToken'
import { useGameSlice } from "../game/useGameSlice"
import { usePlayerSlice } from "../player/usePlayerSlice"

export const useBoardCell = (i, j, isTarget) => {
    const dispatch = useDispatch()

    const { setSelectedToken } = useSetSelectedToken();

    const {
        selectedToken,
        validAttacks,
        validMoves,
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
        moveTokenTo(selectedToken, i, j)
        dispatch(setSelectedToken(null))
    }

    const moveTokenTo = (token, i, j) => {
        // dispatch(
        setTokenLocation({ token, i, j })
        // )
    }

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
        token,
        moveSelectedTokenTo,
        isMoveTarget,
        isAttackTarget,
    }
}
