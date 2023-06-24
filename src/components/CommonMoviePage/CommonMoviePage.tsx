import { useEffect, useRef, useState } from 'react'

import { mdiMovieOpenRemove } from '@mdi/js'

import IconTextJumbotron from '@/components/IconTextJumbotron/IconTextJumbotron'
import MovieGridWithLoadMore from '@/components/MovieGridWithLoadMore/MovieGridWithLoadMore'
import { MoviePagination } from '@/models/apiResult'
import { Movie } from '@/models/movie'
import { fetchResult } from '@/services/apis/base'
import { fetchFavorites } from '@/store/favorite/favoriteReducer'
import { useAppDispatch, useAppSelector } from '@/store/store'

type Props = {
  fetchFunction: (
    page: number,
    abortController: AbortController,
  ) => Promise<fetchResult<MoviePagination>>
}

export default function CommonMoviePage({ fetchFunction }: Props) {
  const dispatch = useAppDispatch()
  const favoritesInit = useAppSelector((state) => state.favorites.initialized)

  useEffect(() => {
    if (favoritesInit) return
    dispatch(fetchFavorites())
  }, [])

  const [loading, setLoading] = useState(true)
  const [movies, setMovies] = useState<Movie[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)

  const abortController = useRef<AbortController>(new AbortController())

  const fetchAndSet = async (page: number) => {
    if (page > totalPage) return
    setLoading(true)
    const [success, result] = await fetchFunction(page, abortController.current)
    setLoading(false)
    if (success) {
      setCurrentPage(result.page)
      setTotalPage(result.total_pages)
      setMovies((movie) => [...movie, ...result.results])
    }
  }

  useEffect(() => {
    fetchAndSet(1)
    return () => {
      abortController.current?.abort()
    }
  }, [])

  const [loadingCheckerVisible, setLoadingCheckerVisible] = useState(false)

  useEffect(() => {
    if (!loadingCheckerVisible) return
    fetchAndSet(currentPage + 1)
  }, [currentPage, totalPage, loadingCheckerVisible])

  return (
    <>
      <MovieGridWithLoadMore
        movies={movies}
        loading={loading}
        buttonVisible={!loading && currentPage < totalPage}
        loadMoreButtonOnClick={() => fetchAndSet(currentPage + 1)}
        setLoadingCheckerVisible={setLoadingCheckerVisible}
      />
      {!loading && movies.length === 0 && (
        <IconTextJumbotron icon={mdiMovieOpenRemove} text="No result" />
      )}
    </>
  )
}
