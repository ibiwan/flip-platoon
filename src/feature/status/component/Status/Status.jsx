import { observer } from 'mobx-react-lite';

import { TokenCard } from '../TokenCard';
import { DictEntry } from '../DictEntry';
import { SetupDash } from '../SetupDash';
import { TurnDash } from '../TurnDash';

import { useStatus } from './useStatus';

import './Status.css';

export const Status = observer(() => {
    const {
        gameMode,
        inSetupMode,
        inPlayingMode,
        selectedToken,
        clickedToken,
        hoveredToken,
        draggedToken,
    } = useStatus();

    return (
        <div className='statusArea' style={{ display: 'flex', flexDirection: 'column' }}>
            <h1>
                STATUS
            </h1>
            <DictEntry k='game mode' v={gameMode} />
            {inSetupMode &&
                <SetupDash />
            }
            {inPlayingMode &&
                <TurnDash />
            }
            {selectedToken &&
                <TokenCard token={selectedToken} />
            }
            <DictEntry k='selectedToken' v={selectedToken?.id} />
            <DictEntry k='clickedToken' v={clickedToken?.id} />
            <DictEntry k='hoveredToken' v={hoveredToken?.id} />
            <DictEntry k='draggedToken' v={draggedToken?.id} />
        </div>
    );
});
