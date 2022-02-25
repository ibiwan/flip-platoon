import { rules } from 'rules';
import { anArray, ijkey } from 'util';

import { BoardCell } from '../BoardCell';
import './Board.css';

const { boardSize } = rules;

export const Board = () => {
    return (
        <div id='boardArea'>
            <div id='board' style={{
                gridTemplateColumns: `repeat(${boardSize}, 6vmin)`
            }}>
                {
                    anArray(boardSize).map((_, i) =>
                        anArray(boardSize).map((_, j) =>
                            <BoardCell
                                i={i} j={j}
                                key={ijkey(i, j)}
                            />
                        )
                    )
                }
            </div>
        </div>
    );
};
