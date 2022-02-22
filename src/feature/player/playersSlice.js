import { createSelector, createSlice } from '@reduxjs/toolkit'
import { ijkey } from '../../util'

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
        setTokenLocationAction: (stateSlice, { payload: { token, i, j } }) => {
            const foundToken = stateSlice[token.color].tokens
                .find(({ id }) =>
                    id === token.id)
            foundToken.position = { i, j }
        },
        setTokenModeAction: (stateSlice, { payload: { token, mode } }) => {
            const foundToken = stateSlice[token.color].tokens
                .find(({ id }) =>
                    id === token.id)
            foundToken.mode = mode
        },
    }
})

export const {
    setTokenLocationAction,
    setTokenModeAction,
} = playersSlice.actions

export const selectPlayer = color => state => state.playersSlice[color]

export const selectOliveTokens = state => state.playersSlice[PLAYER_OLIVE].tokens

export const selectTanTokens = state => state.playersSlice[PLAYER_TAN].tokens

export const selectAllTokens = createSelector(
    selectOliveTokens,
    selectTanTokens,
    (olive, tan) => [...olive, ...tan]
)

export const selectBoardTokens = createSelector(
    selectAllTokens,
    allTokens => allTokens.filter(({ position }) => position !== TOKEN_POSITION_HOME)
)

export const selectHashedBoardTokens = createSelector(
    selectBoardTokens,
    boardTokens => boardTokens.reduce((acc, cur) => {
        const { position: { i, j } } = cur
        const key = ijkey(i, j)
        acc[key] = cur
        return acc
    }, {})
)

export const selectHomeTokens = createSelector(
    selectAllTokens,
    allTokens => allTokens.filter(({ position }) =>
        position === TOKEN_POSITION_HOME)
)

export const selectReadyToStart = createSelector(
    selectHomeTokens,
    homeTokens => homeTokens.length === 0
)

export const playersReducer = playersSlice.reducer
