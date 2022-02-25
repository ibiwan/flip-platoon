import classNames from 'classnames';

import { TokenIcon } from '../TokenIcon';

export const Coin = ({
    isDragger = false,
    color,
    mode,
    type,
    aRef,
}) => {
    return (
        <div className={classNames(
            'token',
            'fullDisc',
            { 'dragger': isDragger },
            color,
            mode,
        )} ref={aRef}>
            <TokenIcon type={type} size='80%' />
        </div>
    );
};
