import { usePlayersStore } from 'feature/player';
import { useRootStore } from 'util/rootStore';

import { rules } from 'rules';
const { validMoves: validMovesRules } = rules;

export const useGameStore = () => {
    const { gameStore } = useRootStore();

    const {
        occupiedCells,
        allTokens,
        hashedBoardTokens,
    } = usePlayersStore();

    const {
        gameMode,
        clickedTokenId,
        hoveredTokenId,
        draggedTokenId,
        selectedTokenId,

        setGameMode,
        setClickedTokenId,
        setHoveredTokenId,
        setDraggedTokenId,
    } = gameStore;

    const selectedToken = allTokens.find(({ id }) => id === selectedTokenId);

    const validMoves = selectedToken ? [
        ...validMovesRules.getValidStarts(gameMode, occupiedCells, selectedToken),
        ...validMovesRules.getValidMoves(gameMode, occupiedCells, selectedToken),
    ] : [];

    const validAttacks = selectedToken ? [
        ...validMovesRules.getValidAttacks(gameMode, hashedBoardTokens, selectedToken),
    ] : [];

    return {
        gameMode,
        clickedTokenId,
        hoveredTokenId,
        draggedTokenId,
        selectedTokenId,
        selectedToken,

        validMoves,
        validAttacks,

        setGameMode,
        setClickedTokenId,
        setHoveredTokenId,
        setDraggedTokenId,
    };
};
