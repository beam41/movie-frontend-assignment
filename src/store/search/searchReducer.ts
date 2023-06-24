import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type SearchState = {
  text: string
}

const slice = createSlice({
  name: 'search',
  initialState: {
    text: '',
  } as SearchState,
  reducers: {
    setSearchText(state, action: PayloadAction<string>) {
      state.text = action.payload
    },
  },
})

export default slice.reducer
export const { setSearchText } = slice.actions
