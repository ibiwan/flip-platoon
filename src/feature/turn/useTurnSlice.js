import { bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { 
    startTurnAction,
    selectCurrentPlayer,
    selectTurnTokens,
} from './turnSlice' 

export const useTurnSlice = () => {
    const dispatch= useDispatch()

    const actions = useMemo(()=>bindActionCreators({

    }, dispatch), [dispatch])

}
