'use client'
import CommonMoviePage from '@/components/CommonMoviePage/CommonMoviePage'
import { useClearSearchOnEnter } from '@/hooks/useClearSearchOnEnter'
import { useFetchAllFavoritesOnEnter } from '@/hooks/useFetchAllFavoritesOnEnter'
import { useScrollTopOnEnter } from '@/hooks/useScrollTopOnEnter'
import { fetchUpcoming } from '@/services/apis/movie'

export const metadata = {
  title: 'Upcoming | Movie Nights',
}

export default function UpcomingClientPage() {
  useScrollTopOnEnter()
  useClearSearchOnEnter()
  useFetchAllFavoritesOnEnter()

  return <CommonMoviePage fetchFunction={fetchUpcoming} />
}
