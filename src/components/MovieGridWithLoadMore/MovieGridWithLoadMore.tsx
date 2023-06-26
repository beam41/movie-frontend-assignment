import { useEffect, useRef } from 'react'

import clsx from 'clsx'

import MovieGrid from '@/components/MovieGrid/MovieGrid'
import { Movie } from '@/models/movie'

import styles from './MovieGridWithLoadMore.module.scss'

type Props = {
  movies: Movie[]
  loading: boolean
  skeletonAmount?: number
  buttonVisible: boolean
  loadMoreButtonOnClick: () => void
  onLoadingCheckerVisibleChange: (visible: boolean) => void
}

export default function MovieGridWithLoadMore({
  movies,
  loading,
  skeletonAmount = 20,
  buttonVisible,
  loadMoreButtonOnClick,
  onLoadingCheckerVisibleChange,
}: Props) {
  const loadingCheckerReference = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!loadingCheckerReference.current) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          onLoadingCheckerVisibleChange(entry.isIntersecting)
        }
      },
      {
        rootMargin: '400px', // around the size of movie grid to prevent showing an incomplete list
      },
    )

    observer.observe(loadingCheckerReference.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <MovieGrid
        movies={movies}
        renderSkeleton={loading}
        skeletonAmount={skeletonAmount}
      />
      <button
        className={clsx(styles.loadMoreButton, {
          [styles.visible]: buttonVisible,
        })}
        ref={loadingCheckerReference}
        onClick={loadMoreButtonOnClick}
      >
        Load More
      </button>
    </>
  )
}
