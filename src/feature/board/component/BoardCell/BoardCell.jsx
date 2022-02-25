import classnames from 'classnames';

import { Token } from 'feature/token';

import { useBoardCell } from './useBoardCell';
import './BoardCell.css';

export const BoardCell = ({
    i, j,
}) => {
    const {
        key,
        isOver,
        dropRef,
        token,
        moveSelectedTokenTo,
        isMoveTarget,
        isAttackTarget,
        setHoveredBoardCell,
        isHovered,
    } = useBoardCell(
        i, j,
    );

    const onClick = e => {
        if (isMoveTarget || isAttackTarget) {
            e.stopPropagation();
            moveSelectedTokenTo(i, j);
        }
    };

    const onMouseEnter = () => {
        setHoveredBoardCell(key);
    };

    const onMouseLeave = () => {
        setHoveredBoardCell(null);
    };

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
            <div
                className={classnames(
                    'frame',
                    { 'valid-attack-target': isAttackTarget },
                    { 'current-attack-target': isAttackTarget && (isOver || isHovered) },
                    { 'is-hovered': isHovered },
                )}
            >
            </div>
            {token &&
                <Token
                    token={token}
                />
            }
        </div>
    );
};
