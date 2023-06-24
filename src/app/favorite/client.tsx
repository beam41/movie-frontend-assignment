'use client'
import { useEffect } from 'react'

import { mdiMovieOpenRemove } from '@mdi/js'

import IconTextJumbotron from '@/components/IconTextJumbotron/IconTextJumbotron'
import MovieGrid from '@/components/MovieGrid/MovieGrid'
import { useScrollTopOnEnter } from '@/hooks/useScrollTopOnEnter'
import { fetchFavorites } from '@/store/favorite/favoriteReducer'
import { useAppDispatch, useAppSelector } from '@/store/store'

export default function FavoriteClientPage() {
  useScrollTopOnEnter()

  const dispatch = useAppDispatch()
  const { favorites, loading, dirty } = useAppSelector(
    (state) => state.favorites,
  )

  useEffect(() => {
    if (!dirty) return
    dispatch(fetchFavorites())
  }, [dirty])

  return (
    <>
      <MovieGrid
        movies={favorites}
        renderSkeleton={loading}
        skeletonAmount={12}
      />
      {!loading && favorites.length === 0 && (
        <IconTextJumbotron icon={mdiMovieOpenRemove} text="No favorite" />
      )}
    </>
  )
}
