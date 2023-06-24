import { useEffect } from 'react'

import { fetchFavorites } from '@/store/favorite/favoriteReducer'
import { useAppDispatch, useAppSelector } from '@/store/store'

export function useInitFavoritesOnEnter() {
  const dispatch = useAppDispatch()
  const favoritesInit = useAppSelector((state) => state.favorites.initialized)

  useEffect(() => {
    if (favoritesInit) return
    dispatch(fetchFavorites())
  }, [])
}
