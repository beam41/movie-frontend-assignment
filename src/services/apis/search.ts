import { MoviePagination } from '@/models/apiResult'
import { fetchResult } from '@/services/apis/base'

export async function searchMovies(
  searchText: string,
  page: number,
  abortSignal?: AbortSignal,
): Promise<fetchResult<MoviePagination>> {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${searchText}&include_adult=false&language=en-US&page=${page}`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
      signal: abortSignal,
    },
  )
  const json = await response.json()
  return [response.ok, json]
}
