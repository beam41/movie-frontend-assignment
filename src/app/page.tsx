'use client'
import { useEffect, useRef, useState } from 'react'

import { mdiHeart, mdiMovieOpen, mdiPopcorn, mdiStar, mdiTicket } from '@mdi/js'

import BackToTopButton from '@/components/BackToTopButton/BackToTopButton'
import CategorySelect, {
  Category,
} from '@/components/CategorySelect/CategorySelect'
import MovieGrid from '@/components/MovieGrid/MovieGrid'
import SearchBox from '@/components/SearchBox/SearchBox'
import { MoviePagination } from '@/models/apiResult'
import { Movie } from '@/models/movie'
import { fetchResult } from '@/services/apis/base'
import {
  fetchNowPlaying,
  fetchPopular,
  fetchTopRated,
  fetchUpcoming,
} from '@/services/apis/movie'
import { fetchFavorites } from '@/store/favorite/favoriteReducer'
import { useAppDispatch, useAppSelector } from '@/store/store'

import styles from './page.module.scss'

type CategoriesWithFetch = Category & {
  fetchFunction?: (page: number) => Promise<fetchResult<MoviePagination>>
}

const categories: CategoriesWithFetch[] = [
  {
    name: 'Now Playing',
    icon: mdiPopcorn,
    color: '#00695C',
    visible: true,
    fetchFunction: fetchNowPlaying,
  },
  {
    name: 'Popular',
    icon: mdiTicket,
    color: '#2E7D32',
    visible: true,
    fetchFunction: fetchPopular,
  },
  {
    name: 'Top Rated',
    icon: mdiStar,
    color: '#F57F17',
    visible: true,
    fetchFunction: fetchTopRated,
  },
  {
    name: 'Upcoming',
    icon: mdiMovieOpen,
    color: '#0D47A1',
    visible: true,
    fetchFunction: fetchUpcoming,
  },
  {
    name: 'Favorite Movies',
    icon: mdiHeart,
    color: '#C62828',
    visible: true,
  },
]

const favoritePageIndex = 4

export default function Home() {
  const dispatch = useAppDispatch()
  const { favorites, loading: favoritesLoading } = useAppSelector(
    (state) => state.favorites,
  )

  const loadingCheckerReference = useRef<HTMLDivElement>(null)
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

  const [categoryIndex, setCategoryIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [movies, setMovies] = useState<Movie[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)

  const fetchAndSet = async (index: number, page: number) => {
    if (currentPage > totalPage) return
    setLoading(true)
    const [success, result] = await categories[index].fetchFunction!(page)
    setLoading(false)
    if (success) {
      setCurrentPage(result.page)
      setTotalPage(result.total_pages)
      setMovies((movie) => [...movie, ...result.results])
    }
  }

  useEffect(() => {
    dispatch(fetchFavorites())
    fetchAndSet(categoryIndex, 1)
  }, [])

  useEffect(() => {
    if (categoryIndex === favoritePageIndex || !loadingCheckerVisible) return
    fetchAndSet(categoryIndex, currentPage + 1)
  }, [currentPage, totalPage, loadingCheckerVisible])

  const changeCategory = async (index: number) => {
    setCategoryIndex(index)
    if (index === favoritePageIndex) {
      dispatch(fetchFavorites())
    } else {
      setMovies([])
      setCurrentPage(1)
      setTotalPage(1)
      fetchAndSet(index, 1)
    }
  }

  return (
    <div className={styles.pageBody}>
      <BackToTopButton />
      <div className={styles.searchBoxCover}>
        <SearchBox
          value={'fsdf'}
          onInput={(value) => {
            console.log(value)
          }}
        />
      </div>
      <div className={styles.categorySelectCover}>
        <CategorySelect
          categories={categories}
          selectingCategoryIndex={categoryIndex}
          onClick={changeCategory}
        />
      </div>
      <div className={styles.gridCover}>
        <MovieGrid
          movies={categoryIndex === favoritePageIndex ? favorites : movies}
          renderSkeleton={
            categoryIndex === favoritePageIndex ? favoritesLoading : loading
          }
          skeletonAmount={12}
        />
        <div
          className={styles.loadingChecker}
          ref={loadingCheckerReference}
        ></div>
      </div>
    </div>
  )
}
