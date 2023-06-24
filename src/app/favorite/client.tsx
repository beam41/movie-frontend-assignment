'use client'

import { mdiMovieOpenRemove } from '@mdi/js'

import IconTextJumbotron from '@/components/IconTextJumbotron/IconTextJumbotron'
import MovieGrid from '@/components/MovieGrid/MovieGrid'
import { useAppSelector } from '@/store/store'

export default function FavoriteClientPage() {
  const { favorites, loading } = useAppSelector((state) => state.favorites)

  return (
    <>
      <MovieGrid
        movies={favorites}
        renderSkeleton={loading}
        skeletonAmount={12}
      />
      {!loading && favorites.length === 0 && (
        <IconTextJumbotron icon={mdiMovieOpenRemove} text="No favorite" />
      )}
    </>
  )
}
