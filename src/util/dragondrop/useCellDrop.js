import { useDrop } from 'react-dnd';

import { ItemTypes } from './itemTypes';

export const useCellDrop = (dropCb, deps) => {
    return useDrop(
        () => ({
            accept: ItemTypes.TOKEN,
            drop: dropCb,
            collect: (monitor) => ({
                isOver: !!monitor.isOver()
            })
        }),
        deps
    );
};
