import { useBoard } from "./useBoard"

import { rules } from '../../util/rules'
import { anArray, ijkey } from "../../util"

import "./Board.css"
import { Fragment } from "react"
import { BoardCell } from "./BoardCell"

const { boardSize } = rules

export const Board = () => {
    const {
        hashedTokens,
        selectedTokenId,
        setSelectedToken,
        validCells,
    } = useBoard()

    const rowCells = (i) =>
        anArray(boardSize).map((_, j) => {
            const key = ijkey(i, j)
            const token = hashedTokens[key]
            const isTarget = selectedTokenId && validCells.includes(key)

            const props = {
                ...(token && {
                    token,
                    selected: token.id === selectedTokenId,
                    setSelectedToken,
                }),
                isTarget,
            }


            // token ? {
            //     token,
            //     selected: token.id === selectedTokenId,
            //     setSelectedToken,
            //     isTarget
            // } : {}

            // console.log({ key, isTarget, selectedTokenId, props })

            return <BoardCell key={key} {...props} />
        })

    const boardRows = () =>
        anArray(boardSize).map((_, i) =>
            <Fragment key={i}>
                {rowCells(i)}
            </Fragment>
        )

    return (
        <div id="boardArea">
            <div id="board" style={{
                gridTemplateColumns: `repeat(${boardSize}, 1fr)`
            }}>
                {boardRows()}
            </div>
        </div>
    )
}