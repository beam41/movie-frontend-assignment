'use client'
import { useEffect, useRef, useState } from 'react'

import clsx from 'clsx'

import MovieGrid from '@/components/MovieGrid/MovieGrid'
import { MoviePagination } from '@/models/apiResult'
import { Movie } from '@/models/movie'
import { fetchResult } from '@/services/apis/base'
import { fetchFavorites } from '@/store/favorite/favoriteReducer'
import { useAppDispatch, useAppSelector } from '@/store/store'

import styles from './CommonMoviePage.module.scss'

type Props = {
  fetchFunction: (page: number) => Promise<fetchResult<MoviePagination>>
}

export default function CommonMoviePage({ fetchFunction }: Props) {
  const dispatch = useAppDispatch()
  const favoritesInit = useAppSelector((state) => state.favorites.init)

  useEffect(() => {
    if (favoritesInit) return
    dispatch(fetchFavorites())
  }, [])

  const loadingCheckerReference = useRef<HTMLButtonElement>(null)
  const [loadingCheckerVisible, setLoadingCheckerVisible] = useState(false)

  useEffect(() => {
    if (!loadingCheckerReference.current) return
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        setLoadingCheckerVisible(entry.isIntersecting)
      }
    })

    observer.observe(loadingCheckerReference.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  const [loading, setLoading] = useState(true)
  const [movies, setMovies] = useState<Movie[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)

  const fetchAndSet = async (page: number) => {
    if (currentPage > totalPage) return
    setLoading(true)
    const [success, result] = await fetchFunction(page)
    setLoading(false)
    if (success) {
      setCurrentPage(result.page)
      setTotalPage(result.total_pages)
      setMovies((movie) => [...movie, ...result.results])
    }
  }

  useEffect(() => {
    fetchAndSet(1)
  }, [])

  useEffect(() => {
    if (!loadingCheckerVisible) return
    fetchAndSet(currentPage + 1)
  }, [currentPage, totalPage, loadingCheckerVisible])

  return (
    <>
      <MovieGrid movies={movies} renderSkeleton={loading} skeletonAmount={12} />
      <button
        className={clsx(styles.loadMoreButton, {
          [styles.visible]: currentPage < totalPage,
        })}
        ref={loadingCheckerReference}
        onClick={() => fetchAndSet(currentPage + 1)}
      >
        Load More
      </button>
    </>
  )
}
