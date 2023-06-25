'use client'
import { useCallback, useEffect, useRef, useState } from 'react'

import { mdiMagnify, mdiMovieOpenRemove } from '@mdi/js'
import { debounce } from 'debounce'
import { useSearchParams } from 'next/navigation'

import IconTextJumbotron from '@/components/IconTextJumbotron/IconTextJumbotron'
import MovieGridWithLoadMore from '@/components/MovieGridWithLoadMore/MovieGridWithLoadMore'
import { useInitFavoritesOnEnter } from '@/hooks/useInitFavoritesOnEnter'
import { useReportErrorOnSnackbar } from '@/hooks/useReportErrorOnSnackbar'
import { useScrollTopOnEnter } from '@/hooks/useScrollTopOnEnter'
import { Movie } from '@/models/movie'
import { searchMovies } from '@/services/apis/search'
import { setSearchText } from '@/store/search/searchReducer'
import { useAppDispatch, useAppSelector } from '@/store/store'

export default function SearchClientPage() {
  useScrollTopOnEnter()
  useInitFavoritesOnEnter()

  const dispatch = useAppDispatch()

  const searchText = useAppSelector((state) => state.search.text)
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchText) return
    const text = searchParams.get('text')
    if (!text) return
    dispatch(setSearchText(text))
  }, [])

  const [loading, setLoading] = useState(true)
  const [movies, setMovies] = useState<Movie[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)

  const reportErrorOnSnackbar = useReportErrorOnSnackbar()

  const fetchAndSet = async (
    text: string,
    page: number,
    abortSignal?: AbortSignal,
  ) => {
    if (page > totalPage) return
    setLoading(true)

    try {
      const result = await searchMovies(text, page, abortSignal)
      setLoading(false)
      setCurrentPage(result.page)
      setTotalPage(result.total_pages)
      setMovies((movie) => [...movie, ...result.results])
    } catch (error) {
      setLoading(false)
      setCurrentPage(1)
      setTotalPage(1)
      setMovies([])
      reportErrorOnSnackbar(error, 'Cannot fetch movies')
    }
  }

  const debouncedFetchAndSet = useCallback(debounce(fetchAndSet, 500), [])

  const abortController = useRef<AbortController | null>(null)

  useEffect(() => {
    return () => {
      abortController.current?.abort()
    }
  }, [])

  useEffect(() => {
    setMovies([])
    setCurrentPage(1)
    setTotalPage(1)
    setLoading(false)

    debouncedFetchAndSet.clear()
    if (abortController.current) {
      abortController.current.abort('searchText changes')
    }
    if (!searchText) return
    setLoading(true)
    const controller = new AbortController()
    debouncedFetchAndSet(searchText, 1, controller.signal)
    abortController.current = controller
  }, [searchText])

  const [loadingCheckerVisible, setLoadingCheckerVisible] = useState(false)

  useEffect(() => {
    if (!loadingCheckerVisible) return
    fetchAndSet(searchText, currentPage + 1)
  }, [currentPage, totalPage, loadingCheckerVisible])

  return (
    <>
      {!searchText && (
        <IconTextJumbotron
          icon={mdiMagnify}
          text="Type something to start searching."
        />
      )}
      <MovieGridWithLoadMore
        movies={movies}
        loading={loading}
        buttonVisible={!loading && currentPage < totalPage}
        loadMoreButtonOnClick={() => fetchAndSet(searchText, currentPage + 1)}
        setLoadingCheckerVisible={setLoadingCheckerVisible}
      />
      {searchText && !loading && movies.length === 0 && (
        <IconTextJumbotron icon={mdiMovieOpenRemove} text="No result" />
      )}
    </>
  )
}
