'use client'
import CommonMoviePage from '@/components/CommonMoviePage/CommonMoviePage'
import { fetchNowPlaying } from '@/services/apis/movie'

export default function NowPlayingClientPage() {
  return <CommonMoviePage fetchFunction={fetchNowPlaying} />
}
