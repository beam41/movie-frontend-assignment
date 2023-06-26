import { useEffect } from 'react'

import { unwrapResult } from '@reduxjs/toolkit'

import { useReportErrorOnSnackbar } from '@/hooks/useReportErrorOnSnackbar'
import { fetchFavoriteAll } from '@/store/favorite/favoriteReducer'
import { useAppDispatch } from '@/store/store'

export function useInitFavoritesOnEnter() {
  const dispatch = useAppDispatch()
  const reportErrorOnSnackbar = useReportErrorOnSnackbar()

  const initFavorites = async () => {
    try {
      unwrapResult(await dispatch(fetchFavoriteAll()))
    } catch (error) {
      reportErrorOnSnackbar(error, 'Cannot fetch favorites')
    }
  }

  useEffect(() => {
    initFavorites()
  }, [])
}
