'use client'
import CommonMoviePage from '@/components/CommonMoviePage/CommonMoviePage'
import { useClearSearchOnEnter } from '@/hooks/useClearSearchOnEnter'
import { useFetchAllFavoritesOnEnter } from '@/hooks/useFetchAllFavoritesOnEnter'
import { useScrollTopOnEnter } from '@/hooks/useScrollTopOnEnter'
import { fetchPopular } from '@/services/apis/movie'

export default function PopularClientPage() {
  useScrollTopOnEnter()
  useClearSearchOnEnter()
  useFetchAllFavoritesOnEnter()

  return <CommonMoviePage fetchFunction={fetchPopular} />
}
