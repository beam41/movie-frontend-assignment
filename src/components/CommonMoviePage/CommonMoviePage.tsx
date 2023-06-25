import { useEffect, useRef, useState } from 'react'

import { mdiMovieOpenRemove } from '@mdi/js'

import IconTextJumbotron from '@/components/IconTextJumbotron/IconTextJumbotron'
import MovieGridWithLoadMore from '@/components/MovieGridWithLoadMore/MovieGridWithLoadMore'
import { useReportErrorOnSnackbar } from '@/hooks/useReportErrorOnSnackbar'
import { MoviePagination } from '@/models/apiResult'
import { Movie } from '@/models/movie'

type Props = {
  fetchFunction: (
    page: number,
    abortSignal?: AbortSignal,
  ) => Promise<MoviePagination>
}

export default function CommonMoviePage({ fetchFunction }: Props) {
  const [loading, setLoading] = useState(true)
  const [movies, setMovies] = useState<Movie[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)

  const abortController = useRef<AbortController | null>(null)
  const reportErrorOnSnackbar = useReportErrorOnSnackbar()
  const fetchAndSet = async (page: number, abortSignal?: AbortSignal) => {
    if (page > totalPage) return
    setLoading(true)
    try {
      const result = await fetchFunction(page, abortSignal)
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

  useEffect(() => {
    abortController.current = new AbortController()
    fetchAndSet(1, abortController.current?.signal)
    return () => {
      abortController.current?.abort()
    }
  }, [])

  const [loadingCheckerVisible, setLoadingCheckerVisible] = useState(false)

  useEffect(() => {
    if (!loadingCheckerVisible) return
    if (!abortController.current) {
      abortController.current = new AbortController()
    }
    fetchAndSet(currentPage + 1, abortController.current?.signal)
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
