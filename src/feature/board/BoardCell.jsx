import classnames from 'classnames'

import { Token } from "../token/Token"
import { useBoardCell } from './useBoardCell'

export const BoardCell = ({
    i, j,
}) => {
    const {
        key,
        isOver,
        dropRef,
        token,
        moveSelectedTokenTo,
        isMoveTarget,
        isAttackTarget,
        setHoverSelectedBoardCell,
        isHovered,
    } = useBoardCell(
        i, j,
    )

    const onClick = e => {
        if (isMoveTarget || isAttackTarget) {
            e.stopPropagation()
            moveSelectedTokenTo(i, j)
        }
    }

    const onMouseEnter = () => {
        setHoverSelectedBoardCell(key)
    }

    const onMouseLeave = () => {
        setHoverSelectedBoardCell(null)
    }

    return (
        <div
            className={classnames(
                'boardCell',
                { 'valid-move-target': isMoveTarget },
                { 'current-move-target': isMoveTarget && isOver },
                { 'is-hovered': isHovered },
            )}
            ref={dropRef}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div
                className={classnames(
                    'frame',
                    { 'valid-attack-target': isAttackTarget },
                    { 'current-attack-target': isAttackTarget && isOver },
                )}
            >
            </div>
            {token &&
                <Token
                    token={token}
                />
            }
        </div>
    )
}
