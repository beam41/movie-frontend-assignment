'use client'
import CommonMoviePage from '@/components/CommonMoviePage/CommonMoviePage'
import { useScrollTopOnEnter } from '@/hooks/useScrollTopOnEnter'
import { fetchPopular } from '@/services/apis/movie'

export default function PopularClientPage() {
  useScrollTopOnEnter()

  return <CommonMoviePage fetchFunction={fetchPopular} />
}
