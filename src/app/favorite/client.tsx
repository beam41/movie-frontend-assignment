'use client'

import MovieGrid from '@/components/MovieGrid/MovieGrid'
import { useAppSelector } from '@/store/store'

export default function FavoriteClientPage() {
  const { favorites, loading } = useAppSelector((state) => state.favorites)

  return (
    <MovieGrid
      movies={favorites}
      renderSkeleton={loading}
      skeletonAmount={12}
    />
  )
}
