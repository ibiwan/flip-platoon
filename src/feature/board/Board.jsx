import { useBoard } from "./useBoard"

import { rules } from '../../util/rules'
import { anArray, ijkey } from "../../util"

import "./Board.css"
import { Fragment } from "react"
import { Token } from "../token/Token"

const { boardSize } = rules

export const Board = () => {
    const { hashedPieces } = useBoard()

    const rowCells = (i) =>
        anArray(boardSize).map((_, j) => {
            const key = ijkey(i,j) 
            const piece = hashedPieces[key]
            return (<div className="boardCell" key={key}>
                {piece && <Token piece={piece} />}
            </div>)
        }
        )

    const boardRows = () =>
        anArray(boardSize).map((_, i) =>
            <Fragment key={i}>
                {rowCells(i)}
            </Fragment>
        )

    return (
        <>
            <div id="board" style={{ gridTemplateColumns: `repeat(${boardSize}, 6vmin)` }}>
                {boardRows()}
            </div>
        </>
    )
}