'use client'
import { useCallback, useEffect, useState } from 'react'

import { mdiMagnify, mdiMovieOpenRemove } from '@mdi/js'
import { debounce } from 'debounce'
import { useSearchParams } from 'next/navigation'

import IconTextJumbotron from '@/components/IconTextJumbotron/IconTextJumbotron'
import MovieGridWithLoadMore from '@/components/MovieGridWithLoadMore/MovieGridWithLoadMore'
import { Movie } from '@/models/movie'
import { searchMovies } from '@/services/apis/search'
import { fetchFavorites } from '@/store/favorite/favoriteReducer'
import { setSearchText } from '@/store/search/searchReducer'
import { useAppDispatch, useAppSelector } from '@/store/store'

export default function SearchClientPage() {
  const dispatch = useAppDispatch()
  const favoritesInit = useAppSelector((state) => state.favorites.initialized)

  useEffect(() => {
    if (favoritesInit) return
    dispatch(fetchFavorites())
  }, [])

  const searchText = useAppSelector((state) => state.search.text)
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchText) return
    const text = searchParams.get('text')
    if (!text) return
    dispatch(setSearchText(text))
  }, [])

  useEffect(() => {
    return () => {
      dispatch(setSearchText(''))
    }
  }, [])

  const [loading, setLoading] = useState(true)
  const [movies, setMovies] = useState<Movie[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)

  const fetchAndSet = async (
    text: string,
    page: number,
    abortController?: AbortController,
  ) => {
    if (page > totalPage) return
    setLoading(true)
    try {
      const [success, result] = await searchMovies(text, page, abortController)
      setLoading(false)
      if (success) {
        setCurrentPage(result.page)
        setTotalPage(result.total_pages)
        setMovies((movie) => [...movie, ...result.results])
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') return
    }
  }

  const debouncedFetchAndSet = useCallback(debounce(fetchAndSet, 500), [])

  const [abortController, setAbortController] =
    useState<AbortController | null>(null)

  useEffect(() => {
    setMovies([])
    setCurrentPage(1)
    setTotalPage(1)
    setLoading(false)

    debouncedFetchAndSet.clear()
    if (abortController) {
      abortController.abort('searchText changes')
    }
    if (!searchText) return
    setLoading(true)
    const controller = new AbortController()
    debouncedFetchAndSet(searchText, 1, controller)
    setAbortController(controller)
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
