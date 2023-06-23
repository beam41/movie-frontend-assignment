import { Movie } from '@/models/movie'

export interface MoviePagination {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export interface ApiError {
  success: boolean
  status_code: number
  status_message: string
}

export type MovieApiResult = MoviePagination | ApiError
