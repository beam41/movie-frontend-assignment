import { mdiHeart, mdiLoading } from '@mdi/js'
import Icon from '@mdi/react'
import clsx from 'clsx'

import styles from './FavoriteButton.module.scss'

type Props = {
  favorites: boolean
  onClick: (favorites: boolean) => void
  className?: string
  pending: boolean
  pendingCurrent: boolean
}

export default function FavoriteButton({
  favorites,
  onClick,
  className,
  pending,
  pendingCurrent,
}: Props) {
  return (
    <div className={clsx(styles.favoriteButtonWrapper, className)}>
      <button
        className={clsx(styles.favoriteButton, {
          [styles.favorites]: favorites && !pendingCurrent,
          [styles.pending]: pendingCurrent,
        })}
        onClick={() => onClick(!favorites)}
        disabled={pending}
      >
        <Icon
          path={pendingCurrent ? mdiLoading : mdiHeart}
          size={0.8}
          className={clsx(styles.icon)}
        />
      </button>
      <div className={clsx(styles.hint)}>
        {pendingCurrent
          ? 'Loading'
          : (favorites ? 'Remove from' : 'Add to') + ' Favorites'}
      </div>
    </div>
  )
}
