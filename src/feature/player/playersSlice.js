import { createSelector, createSlice } from '@reduxjs/toolkit'

import { PLAYER_OLIVE, PLAYER_TAN, TOKEN_POSITION_HOME } from '../../util/consts'
import { playerInit } from './playerSliceUtils'

const playersInit = {
    [PLAYER_OLIVE]: playerInit(PLAYER_OLIVE),
    [PLAYER_TAN]: playerInit(PLAYER_TAN),
}

export const playersSlice = createSlice({
    name: 'playersSlice',
    initialState: playersInit,
    reducers: {
        setTokenLocation: (stateSlice, { payload: { token, i, j } }) => {
            const foundToken = stateSlice[token.color].tokens
                .find(({ id }) =>
                    id === token.id)
            foundToken.position = { i, j }
        }
    }
})

export const { setTokenLocation } = playersSlice.actions

export const selectPlayer = color => state => state.playersSlice[color]

const selectOliveTokens = state => state.playersSlice[PLAYER_OLIVE].tokens

const selectTanTokens = state => state.playersSlice[PLAYER_TAN].tokens

export const selectAllTokens = createSelector(
    selectOliveTokens,
    selectTanTokens,
    (olive, tan) => [...olive, ...tan]
)

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
