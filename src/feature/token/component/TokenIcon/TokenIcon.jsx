import {
    GiSwordman,
    GiMountedKnight,
    GiArcher,
    GiCatapult,
} from 'react-icons/gi';

import {
    TOKEN_ARCHERS,
    TOKEN_ARTILLERY,
    TOKEN_CAVALRY,
    TOKEN_INFANTRY,
} from 'util/consts';

export const TokenIcon = ({ type, size }) => {
    switch (type) {
        case TOKEN_INFANTRY:
            return <GiSwordman size={size} color='darkblue' />;
        case TOKEN_CAVALRY:
            return <GiMountedKnight size={size} color='darkred' />;
        case TOKEN_ARCHERS:
            return <GiArcher size={size} color='darkgreen' />;
        case TOKEN_ARTILLERY:
            return <GiCatapult size={size} color='darkpurple' />;
        default:
            return <></>;
    }
};
