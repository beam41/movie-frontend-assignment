'use client'
import { useEffect, useState } from 'react'

import { mdiMovieOpenRemove } from '@mdi/js'
import { unwrapResult } from '@reduxjs/toolkit'

import IconTextJumbotron from '@/components/IconTextJumbotron/IconTextJumbotron'
import MovieGridWithLoadMore from '@/components/MovieGridWithLoadMore/MovieGridWithLoadMore'
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
  const { favorites, loading, dirty, page, totalPage } = useAppSelector(
    (state) => state.favorites,
  )

  const fetchFavoritesWrap = async (page: number) => {
    try {
      unwrapResult(await dispatch(fetchFavorites({ page })))
    } catch (error) {
      reportErrorOnSnackbar(error, 'Cannot search')
    }
  }

  useEffect(() => {
    if (!dirty) return
    fetchFavoritesWrap(1)
  }, [dirty])

  const [loadingCheckerVisible, setLoadingCheckerVisible] = useState(false)

  useEffect(() => {
    if (!loadingCheckerVisible) return
    fetchFavoritesWrap(page + 1)
  }, [page, totalPage, loadingCheckerVisible])

  return (
    <>
      <MovieGridWithLoadMore
        movies={favorites}
        loading={loading}
        buttonVisible={!loading && page < totalPage}
        loadMoreButtonOnClick={() => fetchFavoritesWrap(page + 1)}
        onLoadingCheckerVisibleChange={setLoadingCheckerVisible}
      />
      {!loading && favorites.length === 0 && (
        <IconTextJumbotron icon={mdiMovieOpenRemove} text="No favorites" />
      )}
    </>
  )
}
