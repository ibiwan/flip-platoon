import { Flipper } from 'react-flip-toolkit';
import { observer } from 'mobx-react-lite';

import { PLAYER_OLIVE, PLAYER_TAN } from 'util/consts';

import { PlayerSide } from 'feature/player';
import { Board } from 'feature/board';
import { Status } from 'feature/status';

import { useGame } from './useGame';
import './Game.css';

export const Game = observer(() => {
    const {
        tokenSummary,
        setClickedTokenId,
    } = useGame();

    return (
        <Flipper flipKey={tokenSummary}>
            <div id='game'
                onClick={() => setClickedTokenId(null)}
            >
                <PlayerSide color={PLAYER_OLIVE} />
                <Board />
                <PlayerSide color={PLAYER_TAN} />
                <Status />
            </div>
        </Flipper>
    );
});
