import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '@/store/store'

export const favoritesIdSet = createSelector(
  (state: RootState) => state.favorites.favorites,
  (favorites) => new Set(favorites.map((favorite) => favorite.id)),
)
