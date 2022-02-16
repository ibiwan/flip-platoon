import { useBoard } from "./useBoard"

import { rules } from '../../util/rules'
import { anArray, ijkey } from "../../util"

import "./Board.css"
import { Fragment } from "react"
import { Token } from "../token/Token"

const { boardSize } = rules

export const Board = () => {
    const { hashedTokens } = useBoard()

    const rowCells = (i) =>
        anArray(boardSize).map((_, j) => {
            const key = ijkey(i, j)
            const token = hashedTokens[key]
            return (<div className="boardCell" key={key}>
                {token && <Token token={token} />}
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
        <div id="boardArea">
            <div id="board" style={{
                gridTemplateColumns: `repeat(${boardSize}, 6vmin)`
            }}>
                {boardRows()}
            </div>
        </div>
    )
}