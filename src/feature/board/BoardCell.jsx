import classnames from 'classnames'

import { Token } from "../token/Token"
import { useBoardCell } from './useBoardCell'

export const BoardCell = ({
    i, j,
}) => {
    const {
        isOver,
        dropRef,
        token,
        moveSelectedTokenTo,
        isMoveTarget,
        isAttackTarget,
    } = useBoardCell(
        i, j,
    )

    const onClick = e => {
        if (isMoveTarget || isAttackTarget) {
            e.stopPropagation()
            moveSelectedTokenTo(i, j)
        }
    }

    return (
        <div
            className={classnames(
                'boardCell',
                { 'valid-move-target': isMoveTarget },
                { 'current-move-target': isMoveTarget && isOver },
            )}
            ref={dropRef}
            onClick={onClick}
        >
            <div
                className={classnames(
                    'frame',
                    { 'valid-attack-target': isAttackTarget },
                    { 'current-attack-target': isAttackTarget && isOver },
                )}
            >
                {token &&
                    <Token
                        token={token}
                    />
                }
            </div>
        </div>
    )
}
