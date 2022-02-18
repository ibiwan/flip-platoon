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
            className={`boardCell ${isTarget ? 'valid-target' : ''}`}
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
