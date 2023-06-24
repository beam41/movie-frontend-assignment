'use client'
import { useEffect } from 'react'

import CommonMoviePage from '@/components/CommonMoviePage/CommonMoviePage'
import { fetchPopular } from '@/services/apis/movie'

export default function PopularClientPage() {
  useEffect(() => window.scrollTo(0, 0), [])

  return <CommonMoviePage fetchFunction={fetchPopular} />
}
