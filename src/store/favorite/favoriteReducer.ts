import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { MoviePagination, StatusResult } from '@/models/apiResult'
import { Movie } from '@/models/movie'
import {
  fetchFavoriteAll as apiFetchFavoriteAll,
  fetchFavorites as apiFetchFavorites,
  setFavorite as apiSetFavorite,
} from '@/services/apis/favorite'

type FavoritesState = {
  favorites: Movie[]
  loading: boolean
  // need re-fetch when enter favorite page, so it gets data properly.
  dirty: boolean
  setFavoritePending: Movie['id'] | null
  page: number
  totalPage: number
}

const ALL_PAGE = -1

export const fetchFavoriteAll = createAsyncThunk<
  Movie[],
  void,
  { state: { favorites: FavoritesState } }
>(
  'favorites/fetchFavoriteAll',
  async (_, thunkAPI) => {
    const {
      favorites: { page },
    } = thunkAPI.getState()
    return await apiFetchFavoriteAll(
      process.env.NEXT_PUBLIC_ACCOUNT_ID,
      thunkAPI.signal,
      page + 1,
    )
  },
  {
    condition: (_, { getState }) => {
      const {
        favorites: { loading, page, totalPage },
      } = getState()
      if (loading) {
        return false
      }
      if (page === ALL_PAGE || page >= totalPage) {
        return false
      }
    },
  },
)

type FetchFavoritesArgument = {
  page: number
}

export const fetchFavorites = createAsyncThunk<
  MoviePagination,
  FetchFavoritesArgument,
  { state: { favorites: FavoritesState } }
>(
  'favorites/fetchFavorites',
  async ({ page }, thunkAPI) => {
    return await apiFetchFavorites(
      process.env.NEXT_PUBLIC_ACCOUNT_ID,
      page,
      thunkAPI.signal,
    )
  },
  {
    condition: (_, { getState }) => {
      const {
        favorites: { loading },
      } = getState()
      if (loading) {
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
    dirty: true,
    setFavoritePending: null,
    page: 0,
    totalPage: 1,
  } as FavoritesState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchFavoriteAll
      .addCase(fetchFavoriteAll.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchFavoriteAll.fulfilled, (state, action) => {
        state.loading = false
        const result = action.payload
        state.page = ALL_PAGE
        state.totalPage = ALL_PAGE
        state.dirty = false
        state.favorites = [...state.favorites, ...result]
      })
      .addCase(fetchFavoriteAll.rejected, (state, _) => {
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

      // fetchFavorites
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true
        // reset fetchAll
        if (state.page === ALL_PAGE) {
          state.favorites = []
        }
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false
        const { page, total_pages, results } = action.payload
        state.page = page
        state.totalPage = total_pages
        state.dirty = false
        state.favorites = [...state.favorites, ...results]
      })
      .addCase(fetchFavorites.rejected, (state, _) => {
        state.loading = false
      })
  },
})

export default slice.reducer
// export const {  } = slice.actions
