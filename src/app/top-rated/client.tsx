'use client'
import { useEffect } from 'react'

import CommonMoviePage from '@/components/CommonMoviePage/CommonMoviePage'
import { fetchTopRated } from '@/services/apis/movie'

export const metadata = {
  title: 'Top Rated | Movie Nights',
}

export default function TopRatedClientPage() {
  useEffect(() => window.scrollTo(0, 0), [])

  return <CommonMoviePage fetchFunction={fetchTopRated} />
}
