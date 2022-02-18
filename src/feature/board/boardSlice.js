import { createSelector, createSlice } from '@reduxjs/toolkit'
import { TOKEN_POSITION_HOME, PLAYERS } from '../../util/consts'
import { selectAllTokens } from '../player/playersSlice'

export const boardSlice = createSlice({
  name: 'boardSlice',
  initialState: {},
  reducers: {
    a: () => { }
  },
})

export const { a } = boardSlice.actions

export const boardReducer = boardSlice.reducer
