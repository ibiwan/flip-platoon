import { createSelector, createSlice } from '@reduxjs/toolkit'

import { PLAYERS, PLAYER_OLIVE, PLAYER_TAN, TOKEN_POSITION_HOME } from '../../util/consts'
import { playerInit } from './playerSliceUtils'

const playersInit = {
    [PLAYER_OLIVE]: playerInit(PLAYER_OLIVE),
    [PLAYER_TAN]: playerInit(PLAYER_TAN),
}

export const playersSlice = createSlice({
    name: 'playersSlice',
    initialState: playersInit,
    reducers: {
        moveTokenTo: (stateSlice, { payload: { token, i, j } }) => {
            const foundToken = stateSlice[token.color].tokens
                .find(({ id }) =>
                    id === token.id)
            foundToken.position = { i, j }
        }
    }
})

export const { moveTokenTo } = playersSlice.actions

export const selectPlayer = color => state => state.playersSlice[color]

export const selectAllTokens = state => PLAYERS.flatMap(color => state.playersSlice[color].tokens)

export const selectBoardTokens = createSelector(
    selectAllTokens,
    allTokens => allTokens.filter(({ position }) => position !== TOKEN_POSITION_HOME)
)

export const selectHomeTokens = createSelector(
    selectAllTokens,
    allTokens => allTokens.filter(({ position }) => position === TOKEN_POSITION_HOME)
)

export const selectReadyToStart = createSelector(
    selectHomeTokens,
    homeTokens => homeTokens.length === 0
)
export const playersReducer = playersSlice.reducer
