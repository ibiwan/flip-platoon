import { useDrop } from "react-dnd"

import { ItemTypes } from "../../util/dragondrop/itemTypes"
import { ijkey } from "../../util"

import { useGameSlice } from "../game/useGameSlice"
import { usePlayerSlice } from "../player/usePlayerSlice"
import { useBoardSlice } from "../board/useBoardSlice"

import { rules } from '../../util/../rules'

export const useBoardCell = (i, j) => {
    const {
        gameMode,
        selectedToken,
        occupiedCells,
        validAttacks,
        validMoves,
        setClickedTokenId,
        setDraggedTokenId,
    } = useGameSlice()

    const {
        allTokens,
        hashedBoardTokens,
        setTokenLocation,
        doTokenDamage,
    } = usePlayerSlice()

    const {
        hoveredBoardCell,
        setHoveredBoardCell
    } = useBoardSlice()

    const key = ijkey(i, j)

    const token = hashedBoardTokens[key]

    const isMoveTarget = selectedToken?.id && validMoves.includes(key)
    const isAttackTarget = selectedToken?.id && validAttacks.includes(key)
    const isHovered = hoveredBoardCell === key

    const moveSelectedTokenTo = (i, j) => {
        setTokenLocation({ token: selectedToken, i, j })

        setClickedTokenId(null)
        setHoveredBoardCell(null)
    }

    const dropToken = ({ tokenId }) => {
        const movingToken = allTokens.find(t => t.id === tokenId)
        const dragMoves = rules.validMoves.getValidDestinations(gameMode, occupiedCells, movingToken)
        const dragAttacks = rules.validMoves.getValidAttacks(gameMode, hashedBoardTokens, movingToken)

        const isDragMoveTarget = dragMoves.includes(key)
        const isDragAttackTarget = dragAttacks.includes(key)

        if (isDragMoveTarget) {
            setTokenLocation({ token: movingToken, i, j })
        } else if (isDragAttackTarget) {
            const { type, mode } = movingToken
            const damage = rules.tokens[type][mode].damage
            doTokenDamage({ token, damage })
        } else {
            setDraggedTokenId(null)
            return
        }

        setDraggedTokenId(null)
        setClickedTokenId(null)
        setHoveredBoardCell(null)
    }

    const [{ isOver }, dropRef] = useDrop(
        () => ({
            accept: ItemTypes.TOKEN,
            drop: (item) => dropToken(item),
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
        setHoveredBoardCell,
    }
}
