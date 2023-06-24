import { mdiImageBrokenVariant } from '@mdi/js'
import Icon from '@mdi/react'
import clsx from 'clsx'

import styles from './NoImage.module.scss'

type Props = {
  iconSize?: number
  className?: string
}

export default function NoImage({ iconSize = 3, className }: Props) {
  return (
    <div className={clsx(styles.noImageCover, className)}>
      <Icon path={mdiImageBrokenVariant} size={iconSize} />
    </div>
  )
}
