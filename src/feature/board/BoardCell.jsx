import classnames from 'classnames'
import { Token } from "../token/Token"
import { useBoardCell } from './useBoardCell'

export const BoardCell = ({
    i, j,
    token,
    selected,
    isTarget,
    setSelectedToken,
    moveSelectedTokenTo,
}) => {
    const { isOver, dropRef } = useBoardCell(i, j, isTarget)

    const onClick = e => {
        if (!isTarget) {
            return
        }

        e.stopPropagation()
        moveSelectedTokenTo(i, j)
        setSelectedToken(null)
    }

    return (
        <div
            className={classnames(
                'boardCell',
                { 'valid-target': isTarget },
                { 'current-target': isTarget && isOver },
            )}
            ref={dropRef}
            onClick={onClick}
        >
            {token &&
                <>
                    <Token
                        token={token}
                        selected={selected}
                        setSelectedToken={setSelectedToken}
                    />
                </>
            }
        </div>
    )
}
