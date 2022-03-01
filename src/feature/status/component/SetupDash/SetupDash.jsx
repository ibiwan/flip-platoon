import { DictEntry } from "../DictEntry/DictEntry";
import { useSetupDash } from "./useSetupDash";

export const SetupDash = () => {
    const {
        oliveReadyToStart,
        tanReadyToStart,
        boardReadyToStart,
        gameReadyToStart,
        numOliveSkirmishTokens,
        numTanSkirmishTokens,
        firstPlayer,
        startGame,
    } = useSetupDash();

    return (
        <>
            <DictEntry k='olive ready' v={oliveReadyToStart ? 'true' : 'false'} />
            <DictEntry k='tan ready' v={tanReadyToStart ? 'true' : 'false'} />
            <DictEntry k='board ready' v={boardReadyToStart ? 'true' : 'false'} />
            <DictEntry k='game (all) ready' v={gameReadyToStart ? 'true' : 'false'} />
            <DictEntry k='# olive skirms' v={numOliveSkirmishTokens} />
            <DictEntry k='# tan skirms' v={numTanSkirmishTokens} />
            <DictEntry k='first player' v={firstPlayer} />

            <button
                type='button'
                // disabled={!gameReadyToStart}
                onClick={startGame}
            >Start Game</button>
        </>
    );
};
