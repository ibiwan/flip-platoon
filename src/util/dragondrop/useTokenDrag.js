import { useDrag } from "react-dnd";

import { ItemTypes } from './itemTypes';

export const useTokenDrag = (
    displayedToken,
    setDraggedTokenId,
) => {
    return useDrag(() => ({
        type: ItemTypes.TOKEN,
        item: () => {
            setDraggedTokenId(displayedToken.id);

            return { tokenId: displayedToken.id };
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
        end: (_, monitor) => {
            if (!monitor.didDrop()) {
                setDraggedTokenId(null);
            }
        }
    }));
};
