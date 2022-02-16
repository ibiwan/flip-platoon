import { createSlice } from '@reduxjs/toolkit'
import { GAME_MODE_SETUP } from '../../util/consts'

const gameInit = {
    mode: GAME_MODE_SETUP,
    currentPlayer: null,
    selectedToken: null,
}
export const gameSlice = createSlice({
    name: 'gameSlice',
    initialState: gameInit,
    reducer: {
        setMode: (gameSlice, { payload }) => { gameSlice.mode = payload }
    },
})

export const { setMode } = gameSlice.actions

export const selectGameMode = state => state.gameSlice.mode

export const gameReducer = gameSlice.reducer
