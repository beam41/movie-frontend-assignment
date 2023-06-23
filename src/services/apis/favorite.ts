import { MoviePagination } from '@/models/apiResult'
import { Movie } from '@/models/movie'
import { fetchResult } from '@/services/apis/base'

export async function fetchFavorite(
  accountId: string,
  page: number,
): Promise<fetchResult<MoviePagination>> {
  const response = await fetch(
    `https://api.themoviedb.org/3/account/${accountId}/favorite/movies?language=en-US&page=${page}&sort_by=created_at.asc`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
    },
  )
  const json = await response.json()
  return [response.ok, json]
}

export async function fetchFavoriteAll(
  accountId: string,
): Promise<fetchResult<Movie[]>> {
  const results = [] as Movie[]
  const [success, favoritesPage1Result] = await fetchFavorite(accountId, 1)
  if (!success) {
    return [false, favoritesPage1Result]
  }
  results.push(...favoritesPage1Result.results)
  for (let page = 2; page <= favoritesPage1Result.total_pages; page++) {
    const [success, favoritesResult] = await fetchFavorite(accountId, page)
    if (!success) {
      return [false, favoritesResult]
    }
    results.push(...favoritesResult.results)
  }
  return [true, results]
}
