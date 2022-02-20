import classNames from 'classnames';
import { Flipped } from 'react-flip-toolkit'

import { TokenIcon } from './TokenIcon';
import { useToken } from './useToken';

import "./Token.css"

export const Token = ({
    token,
}) => {
    const {
        id,
        color,
        type,
        mode,
    } = token

    const {
        /*isDragging,*/
        dragRef,
        setHoverSelectedTokenId,
        toggleTokenMode,
        selected,
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
        <Flipped
            flipId={token.id}
        >
            <div
                className={'tokenWrapper'}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <div className={classNames('stayToken', 'token', color, mode)}>
                    <TokenIcon type={type} size="80%" />
                </div>
                <div className={classNames('goToken', 'token', color, mode)} ref={dragRef}>
                    <TokenIcon type={type} size="80%" />
                </div>
                {selected &&
                    <div className='tokenGlow'>
                    </div>
                }
            </div>
        </Flipped>
    )
}
