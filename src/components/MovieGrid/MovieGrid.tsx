import clsx from 'clsx'
import dayjs from 'dayjs'

import FavoriteButton from '@/components/FavoriteButton/FavoriteButton'
import LazyImage from '@/components/LazyImage/LazyImage'
import NoImage from '@/components/NoImage/NoImage'
import { Movie } from '@/models/movie'

import styles from './MovieGrid.module.scss'

type Props = {
  movies?: Movie[]
  renderSkeleton?: boolean
  skeletonAmount?: number
}

export default function MovieGrid({
  movies,
  renderSkeleton,
  skeletonAmount = 10,
}: Props) {
  return (
    <div className={styles.gridWrapper}>
      {!movies || renderSkeleton
        ? Array.from({ length: skeletonAmount }).map((_, index) => (
            <div key={index} className={styles.movieBoxSkeleton}>
              <div className={clsx(styles.poster, styles.skeleton)}></div>
              <div className={clsx(styles.title, styles.skeleton)}>.</div>
            </div>
          ))
        : movies.map((movie, index) => (
            <div key={movie.id} className={styles.movieBox}>
              <FavoriteButton
                className={clsx(styles.favoriteButton, {
                  [styles.favorites]: index % 2 === 0,
                })}
                favorites={index % 2 === 0}
                onClick={(favorites) => {
                  console.log(favorites)
                }}
              />
              {movie.poster_path ? (
                <LazyImage
                  placeholderSrc={`https://image.tmdb.org/t/p/w45${movie.poster_path}`}
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  srcSet={`https://image.tmdb.org/t/p/w300${movie.poster_path} 1x, https://image.tmdb.org/t/p/w500${movie.poster_path} 2x`}
                  alt={movie.title + ' poster image'}
                  className={styles.poster}
                />
              ) : (
                <NoImage className={styles.poster} />
              )}
              <div className={styles.titleCover}>
                <div className={styles.title}>{movie.title}</div>
                <div className={styles.releaseDate}>
                  {movie.release_date
                    ? dayjs(movie.release_date).format('DD MMM YYYY')
                    : 'No release date'}
                </div>
                <div className={styles.titleFull}>{movie.title}</div>
              </div>
            </div>
          ))}
    </div>
  )
}
