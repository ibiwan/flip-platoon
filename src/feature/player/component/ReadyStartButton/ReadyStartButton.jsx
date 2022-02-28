import classNames from 'classnames';

import "./ReadyStartButton.css";

export const ReadyStartButton = ({
    canSetReadyToStart,
    readyToStart,
    setReadyToStart,
}) => {
    const onClickReady = e => {
        if (!canSetReadyToStart) {
            return;
        }

        e.stopPropagation();
        setReadyToStart(!readyToStart);
    };

    return (
        <div
            className={classNames(
                'ready-to-start-button',
                { 'can-set-ready-to-start': canSetReadyToStart },
                { 'is-ready-to-start': readyToStart, }
            )}
            // disabled={!canSetReadyToStart}
            onClick={onClickReady}
        >
            {readyToStart ? 'READY' : 'NOT READY'}
        </div>
    );
};
