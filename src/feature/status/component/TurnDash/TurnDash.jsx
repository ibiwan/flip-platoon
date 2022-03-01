import { DictEntry } from "../DictEntry/DictEntry";
import { useTurnDash } from "./useTurnDash";

export const TurnDash = () => {
    const {
        currentPlayer,
        turnTokens,
        startOliveTurn,
        startTanTurn,
    } = useTurnDash();

    return (
        <>
            <DictEntry k='current player' v={currentPlayer} />
            <button
                type='button'
                onClick={startTanTurn}
            >Start Tan Turn</button>
            <button
                type='button'
                onClick={startOliveTurn}
            >Start Olive Turn</button>
            <div className='turn-tokens'>
                <h2>
                    Turn Tokens
                </h2>
                {turnTokens.map(tokenMove => {

                    return (
                        <div className='token-turn' key={tokenMove.id}>
                            token: {tokenMove.id}
                            <div className='turn-portion'>
                                <input type='checkbox' checked={tokenMove.moveDone} readOnly /> move done
                            </div>
                            <div className='turn-portion'>
                                <input type='checkbox' checked={tokenMove.attackDone} readOnly /> attack done
                            </div>
                            <div className='turn-portion'>
                                <input type='checkbox' checked={tokenMove.flipDone} readOnly /> flip done
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
