'use client'
import { useEffect } from 'react'

import { mdiMovieOpenRemove } from '@mdi/js'
import { unwrapResult } from '@reduxjs/toolkit'

import IconTextJumbotron from '@/components/IconTextJumbotron/IconTextJumbotron'
import MovieGrid from '@/components/MovieGrid/MovieGrid'
import { useClearSearchOnEnter } from '@/hooks/useClearSearchOnEnter'
import { useReportErrorOnSnackbar } from '@/hooks/useReportErrorOnSnackbar'
import { useScrollTopOnEnter } from '@/hooks/useScrollTopOnEnter'
import { fetchFavorites } from '@/store/favorite/favoriteReducer'
import { useAppDispatch, useAppSelector } from '@/store/store'

export default function FavoriteClientPage() {
  useScrollTopOnEnter()
  useClearSearchOnEnter()
  const reportErrorOnSnackbar = useReportErrorOnSnackbar()

  const dispatch = useAppDispatch()
  const { favorites, loading, dirty } = useAppSelector(
    (state) => state.favorites,
  )

  const fetchFavoritesWrap = async () => {
    try {
      unwrapResult(await dispatch(fetchFavorites({ init: false })))
    } catch (error) {
      reportErrorOnSnackbar(error, 'Cannot search')
    }
  }

  useEffect(() => {
    if (!dirty) return
    fetchFavoritesWrap()
  }, [dirty])

  return (
    <>
      <MovieGrid
        movies={favorites}
        renderSkeleton={loading}
        skeletonAmount={20}
      />
      {!loading && favorites.length === 0 && (
        <IconTextJumbotron icon={mdiMovieOpenRemove} text="No favorite" />
      )}
    </>
  )
}
