'use client'
import CommonMoviePage from '@/components/CommonMoviePage/CommonMoviePage'
import { useScrollTopOnEnter } from '@/hooks/useScrollTopOnEnter'
import { fetchUpcoming } from '@/services/apis/movie'

export const metadata = {
  title: 'Upcoming | Movie Nights',
}

export default function UpcomingClientPage() {
  useScrollTopOnEnter()

  return <CommonMoviePage fetchFunction={fetchUpcoming} />
}
