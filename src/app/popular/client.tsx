'use client'
import CommonMoviePage from '@/components/CommonMoviePage/CommonMoviePage'
import { fetchPopular } from '@/services/apis/movie'

export default function PopularClientPage() {
  return <CommonMoviePage fetchFunction={fetchPopular} />
}
