'use client'
import { useEffect } from 'react'

import CommonMoviePage from '@/components/CommonMoviePage/CommonMoviePage'
import { fetchUpcoming } from '@/services/apis/movie'

export const metadata = {
  title: 'Upcoming | Movie Nights',
}

export default function UpcomingClientPage() {
  useEffect(() => window.scrollTo(0, 0), [])

  return <CommonMoviePage fetchFunction={fetchUpcoming} />
}
