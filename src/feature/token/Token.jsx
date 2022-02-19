import classNames from 'classnames';
import { Flipped } from 'react-flip-toolkit'

import { useToken } from './useToken';

import "./Token.css"
import { TokenIcon } from './TokenIcon';

export const Token = ({
    token,
    selected,
    setSelectedToken,
}) => {
    const {
        id,
        color,
        type,
        mode,
    } = token

    const { /*isDragging,*/ dragRef, setHoverSelectedTokenId } = useToken(token, setSelectedToken)

    const onClick = e => {
        e.stopPropagation()
        if (!selected) {
            setSelectedToken(id)
        } else {
            console.log("second click")
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
