'use client'
import CommonMoviePage from '@/components/CommonMoviePage/CommonMoviePage'
import { fetchUpcoming } from '@/services/apis/movie'

export const metadata = {
  title: 'Upcoming | Movie Nights',
}

export default function UpcomingClientPage() {
  return <CommonMoviePage fetchFunction={fetchUpcoming} />
}
