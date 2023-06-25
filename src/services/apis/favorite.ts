import {
  MoviePagination,
  StatusResult,
  StatusResultThrownError,
} from '@/models/apiResult'
import { Movie } from '@/models/movie'
import { SetFavoriteDto } from '@/models/setFavoriteDto'
import { UnsuccessfulApiResultError } from '@/util/UnsuccessfulApiResultError'

export async function fetchFavorite(
  accountId: string,
  page: number,
  abortSignal?: AbortSignal,
): Promise<MoviePagination> {
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
  if (response.ok) {
    return json
  }
  throw new UnsuccessfulApiResultError(json)
}

export async function fetchFavoriteAll(
  accountId: string,
  abortSignal?: AbortSignal,
): Promise<Movie[]> {
  const results: Movie[] = []
  const favoritesPage1Result = await fetchFavorite(accountId, 1, abortSignal)
  results.push(...favoritesPage1Result.results)
  for (let page = 2; page <= favoritesPage1Result.total_pages; page++) {
    const favoritesResult = await fetchFavorite(accountId, page, abortSignal)
    results.push(...favoritesResult.results)
  }
  return results
}

export async function setFavorite(
  accountId: string,
  mediaId: Movie['id'],
  favorite: boolean,
  abortSignal?: AbortSignal,
): Promise<StatusResultThrownError> {
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
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}1`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: abortSignal,
    },
  )
  const json = (await response.json()) as StatusResult
  if (response.ok && json.success) {
    return json as StatusResultThrownError
  }
  throw new UnsuccessfulApiResultError(json)
}
