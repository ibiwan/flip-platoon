import { createSlice } from '@reduxjs/toolkit'
import { PIECE_POSITION_HOME, PLAYERS } from '../../util/consts'

export const boardSlice = createSlice({
  name: 'boardSlice',
  initialState: {},
  reducer: {
    a: () => { }
  },
})

export const { a } = boardSlice.actions

export const selectBoardPieces = state => PLAYERS
  .flatMap(color =>
    state.playersSlice[color].pieces
      .filter(p =>
        p.position !== PIECE_POSITION_HOME
      )
  )

export const boardReducer = boardSlice.reducer
