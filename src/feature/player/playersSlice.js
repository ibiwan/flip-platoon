import { createSelector, createSlice } from '@reduxjs/toolkit'
import { ijkey } from '../../util'

import { PLAYER_OLIVE, PLAYER_TAN, TOKEN_REALM_BOARD, TOKEN_REALM_GRAVE, TOKEN_REALM_HOME } from '../../util/consts'
import { playerInit } from './playerSliceUtils'

const playersInit = {
    [PLAYER_OLIVE]: playerInit(PLAYER_OLIVE),
    [PLAYER_TAN]: playerInit(PLAYER_TAN),
}

const getSliceToken = (stateSlice, token) => {
    return stateSlice[token.color]
        .tokens.find(({ id }) => id === token.id)
}

export const playersSlice = createSlice({
    name: 'playersSlice',
    initialState: playersInit,
    reducers: {
        setTokenLocationAction: (stateSlice, { payload: { token, i, j } }) => {
            const foundToken = getSliceToken(stateSlice, token)
            foundToken.realm = TOKEN_REALM_BOARD
            foundToken.position = { i, j }
        },
        setTokenModeAction: (stateSlice, { payload: { token, mode } }) => {
            getSliceToken(stateSlice, token).mode = mode
        },
        doTokenDamageAction: (stateSlice, { payload: { token, damage } }) => {
            const foundToken = getSliceToken(stateSlice, token)
            foundToken.health -= damage
            if (foundToken.health <= 0) {
                foundToken.realm = TOKEN_REALM_GRAVE
            }
        }
    }
})

export const {
    setTokenLocationAction,
    setTokenModeAction,
    doTokenDamageAction,
} = playersSlice.actions

export const selectPlayer = color => state => state.playersSlice[color]

export const selectOliveTokens = state => state.playersSlice[PLAYER_OLIVE].tokens

export const selectTanTokens = state => state.playersSlice[PLAYER_TAN].tokens

export const selectAllTokens = createSelector(
    selectOliveTokens,
    selectTanTokens,
    (olive, tan) => [...olive, ...tan]
)

export const makeSelectTokenById = createSelector(
    selectAllTokens,
    (state, id) => id,
    (allTokens, id) => allTokens.find(token => token.id === id)
)

export const selectBoardTokens = createSelector(
    selectAllTokens,
    allTokens => allTokens.filter(({ realm }) => realm === TOKEN_REALM_BOARD)
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
    allTokens => allTokens.filter(({ realm }) =>
        realm === TOKEN_REALM_HOME)
)

export const selectReadyToStart = createSelector(
    selectHomeTokens,
    homeTokens => homeTokens.length === 0
)

export const playersReducer = playersSlice.reducer
