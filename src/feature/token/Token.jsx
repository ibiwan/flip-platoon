import { GiSwordman, GiMountedKnight, GiArcher, GiCatapult } from 'react-icons/gi';
import { TOKEN_ARCHERS, TOKEN_ARTILLERY, TOKEN_CAVALRY, TOKEN_INFANTRY } from '../../util/consts';

import "./Token.css"

export const Token = ({ token }) => {
    const { color, type, mode } = token

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

    return (
        <div className={`token  ${color} ${mode}`}>
            {/* {type} */}
            {icon(type, "80%")}
        </div>
    )
}

