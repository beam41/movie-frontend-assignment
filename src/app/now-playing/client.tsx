'use client'
import { useEffect } from 'react'

import CommonMoviePage from '@/components/CommonMoviePage/CommonMoviePage'
import { fetchNowPlaying } from '@/services/apis/movie'

export default function NowPlayingClientPage() {
  useEffect(() => window.scrollTo(0, 0), [])

  return <CommonMoviePage fetchFunction={fetchNowPlaying} />
}
