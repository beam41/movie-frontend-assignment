'use client'
import CommonMoviePage from '@/components/CommonMoviePage/CommonMoviePage'
import { useClearSearchOnEnter } from '@/hooks/useClearSearchOnEnter'
import { useFetchAllFavoritesOnEnter } from '@/hooks/useFetchAllFavoritesOnEnter'
import { useScrollTopOnEnter } from '@/hooks/useScrollTopOnEnter'
import { fetchTopRated } from '@/services/apis/movie'

export const metadata = {
  title: 'Top Rated | Movie Nights',
}

export default function TopRatedClientPage() {
  useScrollTopOnEnter()
  useClearSearchOnEnter()
  useFetchAllFavoritesOnEnter()

  return <CommonMoviePage fetchFunction={fetchTopRated} />
}
