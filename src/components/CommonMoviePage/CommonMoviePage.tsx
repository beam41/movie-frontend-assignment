import { useEffect, useRef, useState } from 'react'

import { mdiMovieOpenRemove } from '@mdi/js'

import IconTextJumbotron from '@/components/IconTextJumbotron/IconTextJumbotron'
import MovieGridWithLoadMore from '@/components/MovieGridWithLoadMore/MovieGridWithLoadMore'
import { useInitFavoritesOnEnter } from '@/hooks/useInitFavoritesOnEnter'
import { MoviePagination } from '@/models/apiResult'
import { Movie } from '@/models/movie'
import { fetchResult } from '@/services/apis/base'

type Props = {
  fetchFunction: (
    page: number,
    abortSignal: AbortSignal,
  ) => Promise<fetchResult<MoviePagination>>
}

export default function CommonMoviePage({ fetchFunction }: Props) {
  useInitFavoritesOnEnter()

  const [loading, setLoading] = useState(true)
  const [movies, setMovies] = useState<Movie[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)

  const abortController = useRef<AbortController>(new AbortController())

  const fetchAndSet = async (page: number) => {
    if (page > totalPage) return
    setLoading(true)
    const [success, result] = await fetchFunction(
      page,
      abortController.current.signal,
    )
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
