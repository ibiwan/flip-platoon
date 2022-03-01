import { ijkey } from 'util';

import { useGameStore } from 'feature/game';
import { usePlayersStore } from 'feature/player';

import { useBoardStore } from '../../store';
import { useCellDrop } from 'util/dragondrop/useCellDrop';
import { useTokenActions } from 'feature/token/hooks/useTokenActions';

export const useBoardCell = (i, j) => {
    const {
        selectedToken,
        validAttacks,
        validMoves,
    } = useGameStore();

    const {
        hashedBoardTokens,
    } = usePlayersStore();

    const {
        hoveredBoardCell,
        setHoveredBoardCell,
    } = useBoardStore();

    const {
        dropToken,
        moveSelectedTokenTo,
        attackTargetWith,
    } = useTokenActions(i, j);

    const key = ijkey(i, j);

    const cellToken = hashedBoardTokens[key];

    const isMoveTarget = selectedToken?.id && validMoves.includes(key);
    const isAttackTarget = selectedToken?.id && validAttacks.includes(key);
    const isHovered = hoveredBoardCell === key;

    const [{ isOver }, dropRef] = useCellDrop(dropToken, [i, j, isMoveTarget]);

    const onClick = e => {
        if (isMoveTarget) {
            e.stopPropagation();
            moveSelectedTokenTo(i, j);
        } else if (isAttackTarget) {
            e.stopPropagation();
            attackTargetWith(cellToken, selectedToken);
        }
    };

    const onMouseEnter = () => {
        setHoveredBoardCell(key);
    };

    const onMouseLeave = () => {
        setHoveredBoardCell(null);
    };

    return {
        token: cellToken,
        dropRef,

        isOver,
        isMoveTarget,
        isHovered,

        onClick,
        onMouseEnter,
        onMouseLeave
    };
};
