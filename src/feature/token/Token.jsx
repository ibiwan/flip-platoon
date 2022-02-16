import { GiSwordman, GiMountedKnight, GiArcher, GiCatapult } from 'react-icons/gi';
import { PIECE_ARCHERS, PIECE_ARTILLERY, PIECE_CAVALRY, PIECE_INFANTRY } from '../../util/consts';

import "./Token.css"

export const Token = ({ piece }) => {
    const { color, type, mode } = piece

    const icon = (type, size) => {
        switch (type) {
            case PIECE_INFANTRY:
                return <GiSwordman size={size} color="darkblue" />
            case PIECE_CAVALRY:
                return <GiMountedKnight size={size} color="darkred" />
            case PIECE_ARCHERS:
                return <GiArcher size={size} color="darkgreen" />
            case PIECE_ARTILLERY:
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

