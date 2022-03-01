import { ijkey } from 'util';

import { useGameStore } from 'feature/game';

import { useBoardStore } from '../../store';

export const useTargetIndicator = (i, j) => {
    const {
        selectedToken,
        validAttacks,
    } = useGameStore();

    const {
        hoveredBoardCell,
    } = useBoardStore();

    const key = ijkey(i, j);

    const isAttackTarget = selectedToken?.id && validAttacks.includes(key);
    const isHovered = hoveredBoardCell === key;

    return {
        isAttackTarget,
        isHovered,
    };
};
