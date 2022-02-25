import { useDrop } from 'react-dnd';
import { batch } from 'react-redux';

import { rules } from 'rules';
import { ijkey } from 'util';
import { ItemTypes } from 'util/dragondrop/itemTypes';
import { TURN_PHASE_ATTACK, TURN_PHASE_MOVE } from 'util/consts';

import { useGameSlice } from 'feature/game';
import { usePlayersSlice } from 'feature/player';
import { useTurnStore } from 'feature/turn';

import { useBoardStore } from '../../store';

export const useBoardCell = (i, j) => {
    const {
        gameMode,
        selectedToken,
        occupiedCells,
        validAttacks,
        validMoves,
        setClickedTokenId,
        setDraggedTokenId,
    } = useGameSlice();

    const {
        allTokens,
        hashedBoardTokens,
        setTokenLocation,
        doTokenDamage,
    } = usePlayersSlice();

    const {
        canMove,
        canAttack,
        recordTokenTurnPhase,
    } = useTurnStore();

    const {
        hoveredBoardCell,
        setHoveredBoardCell,
    } = useBoardStore();

    const key = ijkey(i, j);

    const token = hashedBoardTokens[key];

    const isMoveTarget = selectedToken?.id && validMoves.includes(key);
    const isAttackTarget = selectedToken?.id && validAttacks.includes(key);
    const isHovered = hoveredBoardCell === key;

    const moveSelectedTokenTo = (i, j) => {
        if (!canMove(selectedToken.id)) {
            console.log('token already moved this turn: ', selectedToken.id);
            return;
        }
        batch(() => {
            setTokenLocation({ token: selectedToken, i, j });
            recordTokenTurnPhase(
                token.id,
                TURN_PHASE_MOVE,
            );

            setClickedTokenId(null);
            setHoveredBoardCell(null);
        });
    };

    const dropToken = ({ tokenId }) => {
        const movingToken = allTokens.find(t => t.id === tokenId);
        const dragMoves = rules.validMoves.getValidDestinations(
            gameMode,
            occupiedCells,
            movingToken,
        );
        const dragAttacks = rules.validMoves.getValidAttacks(
            gameMode,
            hashedBoardTokens,
            movingToken,
        );

        const isDragMoveTarget = dragMoves.includes(key);
        const isDragAttackTarget = dragAttacks.includes(key);

        if (isDragMoveTarget) {
            if (!canMove(movingToken.id)) {
                console.log('token already moved this turn: ', movingToken.id);
                return;
            }

            batch(() => {
                setTokenLocation({ token: movingToken, i, j });
                recordTokenTurnPhase(movingToken.id, TURN_PHASE_MOVE);
            });
        } else if (isDragAttackTarget) {
            if (!canAttack(movingToken.id)) {
                console.log('token already attacked this turn: ', movingToken.id);
                return;
            }

            if (!token) {
                return;
            }

            const { type, mode } = movingToken;
            const damage = rules.tokens[type][mode].damage;
            batch(() => {
                doTokenDamage({ token, damage });
                recordTokenTurnPhase(movingToken.id, TURN_PHASE_ATTACK);
            });
        } else {
            setDraggedTokenId(null);
            return;
        }

        batch(() => {
            setDraggedTokenId(null);
            setClickedTokenId(null);
            setHoveredBoardCell(null);
        });
    };

    const [{ isOver }, dropRef] = useDrop(
        () => ({
            accept: ItemTypes.TOKEN,
            drop: (item) => dropToken(item),
            collect: (monitor) => ({
                isOver: !!monitor.isOver()
            })
        }),
        [i, j, isMoveTarget]
    );

    return {
        key,
        isOver,
        dropRef,
        token,
        moveSelectedTokenTo,
        isMoveTarget,
        isAttackTarget,
        isHovered,
        setHoveredBoardCell,
    };
};
