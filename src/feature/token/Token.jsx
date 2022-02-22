import { Flipped } from 'react-flip-toolkit'

import { useToken } from './useToken';

import "./Token.css"
import { HealthBar } from './HealthBar';
import { SelectionGlow } from './SelectionGlow';
import { Coin } from './Coin';

export const Token = ({
    token,
}) => {
    const {
        id,
        color,
        type,
        mode,
        health,
        maxHealth,
    } = token

    const pctHealth = health * 100 / maxHealth

    const {
        /*isDragging,*/
        dragRef,
        dragPreviewRef,
        setHoverSelectedTokenId,
        toggleTokenMode,
        selected,
        onBoard,
        clickSelected,
        setSelectedToken,
    } = useToken(token)

    const onClick = e => {
        e.stopPropagation()

        if (!clickSelected) {
            setSelectedToken(id)
        } else {
            toggleTokenMode(token)
            setSelectedToken(null)
        }
    }

    const onMouseEnter = () => {
        setHoverSelectedTokenId(id)
    }

    const onMouseLeave = () => {
        setHoverSelectedTokenId(null)
    }

    return (
        <Flipped flipId={token.id}        >
            <div
                className={'tokenWrapper'}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <Coin {...{
                    color, mode, type,
                    isDragger: true,
                    aRef: dragRef,
                }} />
                <Coin {...{
                    color, mode, type,
                    aRef: dragPreviewRef,
                }} />
                {selected && <SelectionGlow />}
                {onBoard && <HealthBar pctHealth={pctHealth} />}
            </div>
        </Flipped>
    )
}
