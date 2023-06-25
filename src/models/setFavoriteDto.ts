import { Movie } from '@/models/movie'

export interface SetFavoriteDto {
  media_type: 'movie'
  media_id: Movie['id']
  favorite: boolean
}
