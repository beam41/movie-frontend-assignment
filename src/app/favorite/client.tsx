'use client'

import { useEffect } from 'react'

import MovieGrid from '@/components/MovieGrid/MovieGrid'
import { fetchFavorites } from '@/store/favorite/favoriteReducer'
import { useAppDispatch, useAppSelector } from '@/store/store'

export default function FavoriteClientPage() {
  const dispatch = useAppDispatch()
  const { favorites, loading } = useAppSelector((state) => state.favorites)

  useEffect(() => {
    dispatch(fetchFavorites())
  }, [])

  return (
    <MovieGrid
      movies={favorites}
      renderSkeleton={loading}
      skeletonAmount={12}
    />
  )
}
