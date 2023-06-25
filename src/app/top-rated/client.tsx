'use client'
import CommonMoviePage from '@/components/CommonMoviePage/CommonMoviePage'
import { useClearSearchOnEnter } from '@/hooks/useClearSearchOnEnter'
import { useInitFavoritesOnEnter } from '@/hooks/useInitFavoritesOnEnter'
import { useScrollTopOnEnter } from '@/hooks/useScrollTopOnEnter'
import { fetchTopRated } from '@/services/apis/movie'

export const metadata = {
  title: 'Top Rated | Movie Nights',
}

export default function TopRatedClientPage() {
  useScrollTopOnEnter()
  useClearSearchOnEnter()
  useInitFavoritesOnEnter()

  return <CommonMoviePage fetchFunction={fetchTopRated} />
}
