'use client'
import CommonMoviePage from '@/components/CommonMoviePage/CommonMoviePage'
import { useScrollTopOnEnter } from '@/hooks/useScrollTopOnEnter'
import { fetchTopRated } from '@/services/apis/movie'

export const metadata = {
  title: 'Top Rated | Movie Nights',
}

export default function TopRatedClientPage() {
  useScrollTopOnEnter()

  return <CommonMoviePage fetchFunction={fetchTopRated} />
}
