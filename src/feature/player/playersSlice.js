import { createSlice } from '@reduxjs/toolkit'

import { PLAYER_OLIVE, PLAYER_TAN} from '../../util/consts'
import { playerInit } from './playerSliceUtils'

const playersInit = {
    [PLAYER_OLIVE]: playerInit(PLAYER_OLIVE),
    [PLAYER_TAN]: playerInit(PLAYER_TAN),
}

export const playersSlice = createSlice({
    name: 'playersSlice',
    initialState: playersInit,
    reducer: {
        a: () => { }
    },
})

export const { a } = playersSlice.actions

export const selectPlayer = color => state => state.playersSlice[color]

export const playersReducer = playersSlice.reducer
