import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { ApiError } from '@/models/apiResult'
import { Movie } from '@/models/movie'
import { fetchResult } from '@/services/apis/base'
import { fetchFavoriteAll } from '@/services/apis/favorite'

export const fetchFavorites = createAsyncThunk<fetchResult<Movie[]>, void>(
  'users/fetchData',
  async () => {
    // Simulate an asynchronous API call
    return await fetchFavoriteAll(process.env.NEXT_PUBLIC_ACCOUNT_ID!)
  },
)

type FavoritesState = {
  favorites: Movie[]
  error: ApiError | null
  loading: boolean
}

const slice = createSlice({
  name: 'favorites',
  initialState: {
    favorites: [],
    error: null,
    loading: true,
  } as FavoritesState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true
        state.favorites = []
        state.error = null
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false
        const [success, result] = action.payload
        if (success) {
          state.favorites = result
        } else {
          state.error = result
        }
      })
  },
})

export default slice.reducer
// export const {  } = slice.actions
