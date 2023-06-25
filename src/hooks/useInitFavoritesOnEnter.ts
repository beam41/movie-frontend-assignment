import { useEffect } from 'react'

import { unwrapResult } from '@reduxjs/toolkit'

import { useReportErrorOnSnackbar } from '@/hooks/useReportErrorOnSnackbar'
import { fetchFavorites } from '@/store/favorite/favoriteReducer'
import { useAppDispatch } from '@/store/store'

export function useInitFavoritesOnEnter() {
  const dispatch = useAppDispatch()
  const reportErrorOnSnackbar = useReportErrorOnSnackbar()

  const initFavorites = async () => {
    try {
      unwrapResult(await dispatch(fetchFavorites({ init: true })))
    } catch (error) {
      reportErrorOnSnackbar(error, 'Cannot fetch favorites')
    }
  }

  useEffect(() => {
    initFavorites()
  }, [])
}
