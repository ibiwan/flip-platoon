import classnames from 'classnames';
import { observer } from 'mobx-react-lite';

import { Token } from 'feature/token';

import { useBoardCell } from './useBoardCell';
import './BoardCell.css';
import { TargetIndicator } from '../TargetIndicator';

export const BoardCell = observer(({
    i, j,
}) => {
    const {
        token,
        dropRef,

        isOver,
        isMoveTarget,
        isHovered,

        onClick,
        onMouseEnter,
        onMouseLeave
    } = useBoardCell(
        i, j,
    );

    return (
        <div
            className={classnames(
                'boardCell',
                { 'valid-move-target': isMoveTarget },
                { 'current-move-target': isMoveTarget && isOver },
                { 'is-hovered': isHovered },
            )}
            ref={dropRef}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <TargetIndicator {...{ i, j, isOver }} />
            {token &&
                <Token token={token} />
            }
        </div>
    );
});
