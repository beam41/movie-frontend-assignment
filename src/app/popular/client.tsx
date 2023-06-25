'use client'
import CommonMoviePage from '@/components/CommonMoviePage/CommonMoviePage'
import { useClearSearchOnEnter } from '@/hooks/useClearSearchOnEnter'
import { useInitFavoritesOnEnter } from '@/hooks/useInitFavoritesOnEnter'
import { useScrollTopOnEnter } from '@/hooks/useScrollTopOnEnter'
import { fetchPopular } from '@/services/apis/movie'

export default function PopularClientPage() {
  useScrollTopOnEnter()
  useClearSearchOnEnter()
  useInitFavoritesOnEnter()

  return <CommonMoviePage fetchFunction={fetchPopular} />
}
