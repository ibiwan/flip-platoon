import { createSlice } from '@reduxjs/toolkit'
import { TOKEN_POSITION_HOME, PLAYERS } from '../../util/consts'

export const boardSlice = createSlice({
  name: 'boardSlice',
  initialState: {},
  reducers: {
    a: () => { }
  },
})

export const { a } = boardSlice.actions

export const selectBoardTokens = state => PLAYERS
  .flatMap(color =>
    state.playersSlice[color].tokens
      .filter(p =>
        p.position !== TOKEN_POSITION_HOME
      )
  )

export const boardReducer = boardSlice.reducer
