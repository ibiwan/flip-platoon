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
        id,
        color,
        type,
        mode,
        health,
        maxHealth,
    } = token;

    const pctHealth = health * 100 / maxHealth;

    const {
        dragRef,
        dragPreviewRef,
        isSelected,
        isClicked,
        isOnBoard,

        toggleTokenMode,
        setClickedTokenId,
        setHoveredTokenId,
    } = useToken(token);

    const onClick = e => {
        e.stopPropagation();

        if (!isClicked) {
            setClickedTokenId(id);
        } else {
            toggleTokenMode(token);
            setClickedTokenId(null);
        }
    };

    const onMouseEnter = () => {
        setHoveredTokenId(id);
    };

    const onMouseLeave = () => {
        setHoveredTokenId(null);
    };

    return (
        <Flipped flipId={token.id}>
            <div
                className={'tokenWrapper'}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <Coin {...{
                    color,
                    mode,
                    type,
                    isDragger: true,
                    aRef: dragRef,
                }} />
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
