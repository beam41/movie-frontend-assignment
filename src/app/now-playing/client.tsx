'use client'
import CommonMoviePage from '@/components/CommonMoviePage/CommonMoviePage'
import { useScrollTopOnEnter } from '@/hooks/useScrollTopOnEnter'
import { fetchNowPlaying } from '@/services/apis/movie'

export default function NowPlayingClientPage() {
  useScrollTopOnEnter()

  return <CommonMoviePage fetchFunction={fetchNowPlaying} />
}
