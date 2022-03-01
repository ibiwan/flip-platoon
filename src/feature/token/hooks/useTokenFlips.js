import { useGameStore } from "feature/game";
import { usePlayersStore } from "feature/player";
import { useTurnStore } from "feature/turn";
import { TURN_PHASE_FLIP } from "util/consts";
import { flipOf } from "util/game";

export const useTokenFlips = () => {
    const {
        setTokenMode
    } = usePlayersStore();

    const {
        currentPlayer,
        hasFlipped,
        recordTokenTurnPhase,
    } = useTurnStore();

    const {
        inPlayingMode,
    } = useGameStore();

    const toggleTokenMode = (token) => {
        if (
            inPlayingMode &&
            token.color !== currentPlayer
        ) {
            console.log(`not your turn, ${token.color}`);
            return;
        }

        if (hasFlipped(token.id)) {
            console.log('token already flipped this turn: ', token.id);
            return;
        }

        setTokenMode(token, flipOf(token.mode));
        recordTokenTurnPhase(token.id, TURN_PHASE_FLIP);
    };

    return { toggleTokenMode };
};
