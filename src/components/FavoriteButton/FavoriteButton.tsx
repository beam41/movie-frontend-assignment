import { mdiHeart } from '@mdi/js'
import Icon from '@mdi/react'
import clsx from 'clsx'

import styles from './FavoriteButton.module.scss'

type Props = {
  favorites: boolean
  onClick: (favorites: boolean) => void
  className?: string
}

export default function FavoriteButton({
  favorites,
  onClick,
  className,
}: Props) {
  return (
    <div className={clsx(styles.favoriteButtonWrapper, className)}>
      <button
        className={clsx(styles.favoriteButton, {
          [styles.favorites]: favorites,
        })}
        onClick={() => onClick(!favorites)}
      >
        <Icon path={mdiHeart} size={0.8} />
      </button>
      <div className={clsx(styles.hint)}>
        {favorites ? 'Remove from' : 'Add to'} Favorites
      </div>
    </div>
  )
}
