import { MoviePagination, StatusResult } from '@/models/apiResult'
import { Movie } from '@/models/movie'
import { SetFavoriteDto } from '@/models/setFavoriteDto'
import { fetchResult } from '@/services/apis/base'

export async function fetchFavorite(
  accountId: string,
  page: number,
  abortSignal?: AbortSignal,
): Promise<fetchResult<MoviePagination>> {
  const response = await fetch(
    `https://api.themoviedb.org/3/account/${accountId}/favorite/movies?language=en-US&page=${page}&sort_by=created_at.asc`,
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

export async function fetchFavoriteAll(
  accountId: string,
  abortSignal?: AbortSignal,
): Promise<fetchResult<Movie[]>> {
  const results: Movie[] = []
  const [success, favoritesPage1Result] = await fetchFavorite(
    accountId,
    1,
    abortSignal,
  )
  if (!success) {
    return [false, favoritesPage1Result]
  }
  results.push(...favoritesPage1Result.results)
  for (let page = 2; page <= favoritesPage1Result.total_pages; page++) {
    const [success, favoritesResult] = await fetchFavorite(
      accountId,
      page,
      abortSignal,
    )
    if (!success) {
      return [false, favoritesResult]
    }
    results.push(...favoritesResult.results)
  }
  return [true, results]
}

export async function setFavorite(
  accountId: string,
  mediaId: number,
  favorite: boolean,
  abortSignal?: AbortSignal,
): Promise<fetchResult<StatusResult>> {
  const body = {
    media_type: 'movie',
    media_id: mediaId,
    favorite: favorite,
  } satisfies SetFavoriteDto
  const response = await fetch(
    `https://api.themoviedb.org/3/account/${accountId}/favorite`,
    {
      method: 'POST',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: abortSignal,
    },
  )
  const json = await response.json()
  return [response.ok, json]
}
