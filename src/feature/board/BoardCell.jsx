
import classnames from 'classnames'
import { Token } from "../token/Token"

export const BoardCell = ({
    i, j,
    token,
    selected,
    isTarget,
    setSelectedToken,
    moveSelectedTokenTo,
}) => {

    const onClick = e => {
        if (!isTarget) {
            return
        }

        e.stopPropagation()
        moveSelectedTokenTo(i, j)
    }

    return (
        <div
            className={classnames('boardCell', { 'valid-target': isTarget })}
            onClick={onClick}
        >
            {token && <Token
                token={token}
                selected={selected}
                setSelectedToken={setSelectedToken}
            />}
        </div>
    )
}
