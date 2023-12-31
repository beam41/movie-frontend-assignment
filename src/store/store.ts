import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import favorites from './favorite/favoriteReducer'
import search from './search/searchReducer'
import snackbar from './snackbar/snackbarReducer'

export const store = configureStore({
  reducer: {
    favorites,
    search,
    snackbar,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
