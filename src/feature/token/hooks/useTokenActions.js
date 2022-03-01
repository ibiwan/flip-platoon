import { rules } from 'rules';
import { TURN_PHASE_ATTACK, TURN_PHASE_MOVE } from 'util/consts';
import { ijkey } from 'util';

import { useGameStore } from 'feature/game';
import { usePlayersStore } from 'feature/player';
import { useTurnStore } from 'feature/turn';
import { useBoardStore } from 'feature/board';

export const useTokenActions = (i, j) => {
    const {
        gameMode,
        inPlayingMode,
        selectedToken,
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
        setHoveredBoardCell,
    } = useBoardStore();

    const key = ijkey(i, j);

    const cellToken = hashedBoardTokens[key];

    const unsafeMoveTokenTo = (token, i, j) => {
        setTokenLocation(token, i, j);
        recordTokenTurnPhase(
            token.id,
            TURN_PHASE_MOVE,
        );

        setClickedTokenId(null);
        setHoveredBoardCell(null);
    };

    const moveTokenTo = (token, i, j) => {
        if (
            inPlayingMode &&
            token.color !== currentPlayer
        ) {
            console.log(`not your turn, ${token.color}`);
            return;
        }

        if (hasMoved(token.id)) {
            console.log('token already moved this turn: ', token.id);
            return;
        }

        unsafeMoveTokenTo(token, i, j);
    };

    const moveSelectedTokenTo = (i, j) => {
        moveTokenTo(selectedToken, i, j);
    };

    const unsafeAttackTargetWith = (target, attacker) => {
        const { type, mode } = attacker;
        const damage = rules.tokens[type][mode].damage;

        doTokenDamage(target, damage);
        recordTokenTurnPhase(attacker.id, TURN_PHASE_ATTACK);
    };

    const attackTargetWith = (target, attacker) => {
        if (
            inPlayingMode &&
            attacker.color !== currentPlayer
        ) {
            console.log(`not your turn, ${attacker.color}`);
        }

        if (hasAttacked(attacker.id)) {
            console.log('token already attacked this turn: ', attacker.id);
            return;
        }

        if (!target) {
            return;
        }

        unsafeAttackTargetWith(target, attacker);
    };

    const clearSelections = () => {
        setDraggedTokenId(null);
        setClickedTokenId(null);
        setHoveredBoardCell(null);
    };

    const dropToken = ({ tokenId }) => {
        const movingToken = allTokens.find(t => t.id === tokenId);

        const {
            isValidMove,
            isValidAttack,
        } = rules.validMoves.checkValid(movingToken, key, gameMode, occupiedCells, hashedBoardTokens);

        if (isValidMove) {
            moveTokenTo(movingToken, i, j);
        } else if (isValidAttack) {
            attackTargetWith(cellToken, movingToken);
        } else {
            setDraggedTokenId(null);
            return;
        }

        clearSelections();
    };

    return {
        moveSelectedTokenTo,
        attackTargetWith,
        dropToken
    };
};
