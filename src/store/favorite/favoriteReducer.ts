import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { StatusResult } from '@/models/apiResult'
import { Movie } from '@/models/movie'
import { fetchResult } from '@/services/apis/base'
import {
  fetchFavoriteAll as apiFetchFavoriteAll,
  setFavorite as apiSetFavorite,
} from '@/services/apis/favorite'

export const fetchFavorites = createAsyncThunk<fetchResult<Movie[]>, void>(
  'favorites/fetchFavorites',
  async (_, thunkAPI) => {
    // Simulate an asynchronous API call
    return await apiFetchFavoriteAll(
      process.env.NEXT_PUBLIC_ACCOUNT_ID!,
      thunkAPI.signal,
    )
  },
)

type SetFavoriteArgument = {
  mediaId: number
  favorite: boolean
}

export const setFavorite = createAsyncThunk<
  fetchResult<StatusResult>,
  SetFavoriteArgument
>('favorites/setFavorite', async ({ mediaId, favorite }, thunkAPI) => {
  // Simulate an asynchronous API call
  return await apiSetFavorite(
    process.env.NEXT_PUBLIC_ACCOUNT_ID!,
    mediaId,
    favorite,
    thunkAPI.signal,
  )
})

type FavoritesState = {
  favorites: Movie[]
  error: StatusResult | null
  loading: boolean
  initialized: boolean
  // need re-fetch when enter favorite page, so it sorts properly.
  dirty: boolean
  setFavoritePending: number | null
}

const slice = createSlice({
  name: 'favorites',
  initialState: {
    favorites: [],
    error: null,
    loading: true,
    initialized: false,
    dirty: true,
    setFavoritePending: null,
  } as FavoritesState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchFavorites
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true
        state.favorites = []
        state.error = null
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false
        state.initialized = true
        state.dirty = false
        const [success, result] = action.payload
        if (success) {
          state.favorites = result
        } else {
          state.error = result
        }
      })
      // setFavorite
      .addCase(setFavorite.pending, (state, action) => {
        const { mediaId } = action.meta.arg
        state.setFavoritePending = mediaId
        state.error = null
      })
      .addCase(setFavorite.fulfilled, (state, action) => {
        state.setFavoritePending = null
        const { mediaId, favorite } = action.meta.arg
        const [success, result] = action.payload
        if (!success || !result.success) {
          state.error = result
          return
        }
        if (favorite) {
          state.favorites = [...state.favorites, { id: mediaId } as Movie]
          state.dirty = true
        } else {
          state.favorites = state.favorites.filter(
            (favorite) => favorite.id !== mediaId,
          )
        }
      })
  },
})

export default slice.reducer
// export const {  } = slice.actions
