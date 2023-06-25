import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { StatusResult } from '@/models/apiResult'
import { Movie } from '@/models/movie'
import {
  fetchFavoriteAll as apiFetchFavoriteAll,
  setFavorite as apiSetFavorite,
} from '@/services/apis/favorite'

type FavoritesState = {
  favorites: Movie[]
  loading: boolean
  initialized: boolean
  // need re-fetch when enter favorite page, so it gets data properly.
  dirty: boolean
  setFavoritePending: Movie['id'] | null
}

type FetchFavoritesArgument = {
  init: boolean
}

export const fetchFavorites = createAsyncThunk<
  Movie[],
  FetchFavoritesArgument,
  { state: { favorites: FavoritesState } }
>(
  'favorites/fetchFavorites',
  async (_, thunkAPI) => {
    return await apiFetchFavoriteAll(
      process.env.NEXT_PUBLIC_ACCOUNT_ID,
      thunkAPI.signal,
    )
  },
  {
    condition: ({ init }, { getState }) => {
      const {
        favorites: { loading, initialized },
      } = getState()
      if (loading) {
        return false
      }
      if (init && initialized) {
        return false
      }
    },
  },
)

type SetFavoriteArgument = {
  mediaId: Movie['id']
  favorite: boolean
}

export const setFavorite = createAsyncThunk<
  StatusResult,
  SetFavoriteArgument,
  { state: { favorites: FavoritesState } }
>(
  'favorites/setFavorite',
  async ({ mediaId, favorite }, thunkAPI) => {
    return await apiSetFavorite(
      process.env.NEXT_PUBLIC_ACCOUNT_ID,
      mediaId,
      favorite,
      thunkAPI.signal,
    )
  },
  {
    condition: (_, { getState }) => {
      const {
        favorites: { setFavoritePending },
      } = getState()
      if (setFavoritePending !== null) {
        return false
      }
    },
  },
)

const slice = createSlice({
  name: 'favorites',
  initialState: {
    favorites: [],
    loading: false,
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
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false
        const result = action.payload
        state.initialized = true
        state.dirty = false
        state.favorites = result
      })
      .addCase(fetchFavorites.rejected, (state, _) => {
        state.loading = false
      })
      // setFavorite
      .addCase(setFavorite.pending, (state, action) => {
        const { mediaId } = action.meta.arg
        state.setFavoritePending = mediaId
      })
      .addCase(setFavorite.fulfilled, (state, action) => {
        state.setFavoritePending = null
        const { mediaId, favorite } = action.meta.arg
        if (favorite) {
          state.favorites = [...state.favorites, { id: mediaId } as Movie]
          state.dirty = true
        } else {
          state.favorites = state.favorites.filter(
            (favorite) => favorite.id !== mediaId,
          )
        }
      })
      .addCase(setFavorite.rejected, (state, _) => {
        state.setFavoritePending = null
      })
  },
})

export default slice.reducer
// export const {  } = slice.actions
