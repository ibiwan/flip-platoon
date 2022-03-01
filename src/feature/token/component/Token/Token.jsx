import { Flipped } from 'react-flip-toolkit';
import { observer } from 'mobx-react-lite';

import { Coin } from '../Coin';
import { HealthBar } from '../HealthBar';
import { SelectionGlow } from '../SelectionGlow';

import { useToken } from './useToken';
import './Token.css';

export const Token = observer(({
    token,
}) => {
    const {
        color,
        type,
        mode,
    } = token;

    const {
        dragRef,
        dragPreviewRef,

        isSelected,
        isOnBoard,
        isMyTurn,
        inSetupMode,

        pctHealth,

        onClick,
        onMouseEnter,
        onMouseLeave,
    } = useToken(token);

    return (
        <Flipped flipId={token.id}>
            <div
                className={'tokenWrapper'}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                {(inSetupMode || isMyTurn) &&
                    <Coin {...{
                        color,
                        mode,
                        type,
                        isDragger: true,
                        aRef: dragRef,
                    }} />}
                <Coin {...{
                    color,
                    mode,
                    type,
                    aRef: dragPreviewRef,
                }} />
                {isSelected && <SelectionGlow />}
                {isOnBoard && <HealthBar pctHealth={pctHealth} />}
            </div>
        </Flipped>
    );
});
