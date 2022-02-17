import { Token } from "../token/Token"

export const BoardCell = ({
    token,
    selected,
    isTarget,
    setSelectedToken,
}) => {
    // if (isTarget) { console.log('target') }
    return (
        <div
            className={`boardCell ${isTarget ? 'valid-target' : ''}`}
            onClick={e => e.stopPropagation()}
        >
            {token && <Token
                token={token}
                selected={selected}
                setSelectedToken={setSelectedToken}
            />}
        </div>
    )
}
