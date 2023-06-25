import { MoviePagination } from '@/models/apiResult'
import { UnsuccessfulApiResultError } from '@/util/UnsuccessfulApiResultError'

export async function fetchNowPlaying(
  page: number,
  abortSignal?: AbortSignal,
): Promise<MoviePagination> {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`,
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

export async function fetchPopular(
  page: number,
  abortSignal?: AbortSignal,
): Promise<MoviePagination> {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
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

export async function fetchTopRated(
  page: number,
  abortSignal?: AbortSignal,
): Promise<MoviePagination> {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`,
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

export async function fetchUpcoming(
  page: number,
  abortSignal?: AbortSignal,
): Promise<MoviePagination> {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`,
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
