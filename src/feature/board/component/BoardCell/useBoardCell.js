import { useDrop } from 'react-dnd';

import { rules } from 'rules';
import { ijkey } from 'util';
import { ItemTypes } from 'util/dragondrop/itemTypes';
import { GAME_MODE_PLAYING, TURN_PHASE_ATTACK, TURN_PHASE_MOVE } from 'util/consts';

import { useGameStore } from 'feature/game';
import { usePlayersStore } from 'feature/player';
import { useTurnStore } from 'feature/turn';

import { useBoardStore } from '../../store';

export const useBoardCell = (i, j) => {
    const {
        gameMode,
        selectedToken,
        validAttacks,
        validMoves,
        setClickedTokenId,
        setDraggedTokenId,
    } = useGameStore();

    const {
        allTokens,
        hashedBoardTokens,
        setTokenLocation,
        doTokenDamage,
        occupiedCells,
    } = usePlayersStore();

    const {
        currentPlayer,
        hasMoved,
        hasAttacked,
        recordTokenTurnPhase,
    } = useTurnStore();

    const {
        hoveredBoardCell,
        setHoveredBoardCell,
    } = useBoardStore();

    const key = ijkey(i, j);

    const cellToken = hashedBoardTokens[key];

    const isMoveTarget = selectedToken?.id && validMoves.includes(key);
    const isAttackTarget = selectedToken?.id && validAttacks.includes(key);
    const isHovered = hoveredBoardCell === key;

    const moveSelectedTokenTo = (i, j) => {
        if (
            gameMode === GAME_MODE_PLAYING &&
            selectedToken.color !== currentPlayer
        ) {
            console.log(`not your turn, ${selectedToken.color}`);
            return;
        }

        if (hasMoved(selectedToken.id)) {
            console.log('token already moved this turn: ', selectedToken.id);
            return;
        }

        setTokenLocation(selectedToken, i, j);
        recordTokenTurnPhase(
            selectedToken.id,
            TURN_PHASE_MOVE,
        );

        setClickedTokenId(null);
        setHoveredBoardCell(null);
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
            if (hasMoved(movingToken.id)) {
                console.log('token already moved this turn: ', movingToken.id);
                return;
            }

            setTokenLocation(movingToken, i, j);
            recordTokenTurnPhase(movingToken.id, TURN_PHASE_MOVE);
        } else if (isDragAttackTarget) {
            if (
                gameMode === GAME_MODE_PLAYING &&
                movingToken.color !== currentPlayer
            ) {
                console.log(`not your turn, ${movingToken.color}`);
            }

            if (hasAttacked(movingToken.id)) {
                console.log('token already attacked this turn: ', movingToken.id);
                return;
            }

            if (!cellToken) {
                return;
            }

            const { type, mode } = movingToken;
            const damage = rules.tokens[type][mode].damage;

            doTokenDamage(cellToken, damage);
            recordTokenTurnPhase(movingToken.id, TURN_PHASE_ATTACK);
        } else {
            setDraggedTokenId(null);
            return;
        }

        setDraggedTokenId(null);
        setClickedTokenId(null);
        setHoveredBoardCell(null);
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
        token: cellToken,

        isMoveTarget,
        isAttackTarget,
        isHovered,

        moveSelectedTokenTo,
        setHoveredBoardCell,
    };
};
