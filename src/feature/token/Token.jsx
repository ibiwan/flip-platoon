import classNames from 'classnames';
import { Flipped } from 'react-flip-toolkit'

import { GiSwordman, GiMountedKnight, GiArcher, GiCatapult } from 'react-icons/gi';
import { TOKEN_ARCHERS, TOKEN_ARTILLERY, TOKEN_CAVALRY, TOKEN_INFANTRY } from '../../util/consts';
import { useToken } from './useToken';

import "./Token.css"

export const Token = ({ token, selected, setSelectedToken }) => {
    const { id, color, type, mode } = token

    const { /*isDragging,*/ dragRef, setHoverSelectedTokenId } = useToken(token, setSelectedToken)

    const icon = (type, size) => {
        switch (type) {
            case TOKEN_INFANTRY:
                return <GiSwordman size={size} color="darkblue" />
            case TOKEN_CAVALRY:
                return <GiMountedKnight size={size} color="darkred" />
            case TOKEN_ARCHERS:
                return <GiArcher size={size} color="darkgreen" />
            case TOKEN_ARTILLERY:
                return <GiCatapult size={size} color="darkpurple" />
            default:
                return <></>
        }
    }

    const onClick = e => {
        e.stopPropagation()
        setSelectedToken(id)
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
                    {icon(type, "80%")}

                </div>
                <div className={classNames('goToken', 'token', color, mode)} ref={dragRef}>
                    {icon(type, "80%")}
                </div>
                {selected &&
                    <div className='tokenGlow'>
                    </div>
                }
            </div>
        </Flipped>
    )
}
