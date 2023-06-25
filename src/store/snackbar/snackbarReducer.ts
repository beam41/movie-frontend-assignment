import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Snackbar = {
  id: string
  message: string
  color: 'success' | 'error'
}

type SnackbarState = {
  snackbars: Snackbar[]
}

const slice = createSlice({
  name: 'snackbar',
  initialState: {
    snackbars: [],
  } as SnackbarState,
  reducers: {
    appendSnackbar(state, action: PayloadAction<Omit<Snackbar, 'id'>>) {
      state.snackbars = [
        ...state.snackbars,
        {
          ...action.payload,
          id: crypto.randomUUID(),
        },
      ]
    },
    removeSnackbar(state, action: PayloadAction<Snackbar['id']>) {
      state.snackbars = state.snackbars.filter(
        (snackbar) => snackbar.id !== action.payload,
      )
    },
  },
})

export default slice.reducer
export const { appendSnackbar, removeSnackbar } = slice.actions
