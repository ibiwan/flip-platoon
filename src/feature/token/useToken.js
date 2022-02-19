import { useDrag } from "react-dnd"
import { ItemTypes } from "../../util/dragondrop/itemTypes"

export const useToken = (selectedToken, setSelectedToken) => {
    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: ItemTypes.TOKEN,
        item: () => {
            setSelectedToken(selectedToken.id);
            return selectedToken;
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        })
    }))

    return { isDragging, dragRef }
}
