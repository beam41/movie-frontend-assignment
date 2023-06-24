'use client'
import CommonMoviePage from '@/components/CommonMoviePage/CommonMoviePage'
import { fetchTopRated } from '@/services/apis/movie'

export const metadata = {
  title: 'Top Rated | Movie Nights',
}

export default function TopRatedClientPage() {
  return <CommonMoviePage fetchFunction={fetchTopRated} />
}
