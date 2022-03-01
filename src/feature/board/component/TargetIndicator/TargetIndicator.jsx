import classNames from "classnames";
import { useTargetIndicator } from "./useTargetIndicator";

export const TargetIndicator = ({ i, j, isOver }) => {
    const {
        isAttackTarget,
        isHovered,
    } = useTargetIndicator(
        i, j,
    );

    return (
        <div
            className={classNames(
                'frame',
                { 'valid-attack-target': isAttackTarget },
                { 'current-attack-target': isAttackTarget && (isOver || isHovered) },
                { 'is-hovered': isHovered },
            )}
        />
    );
};
