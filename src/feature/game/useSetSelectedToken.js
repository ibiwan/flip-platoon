import { useDispatch } from 'react-redux';
import { setSelectedTokenAction } from '../game/gameSlice';

export const useSetSelectedToken = () => {
    const dispatch = useDispatch()

    return {
        setSelectedToken: (id) => dispatch(setSelectedTokenAction(id))
    }
}
