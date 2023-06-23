import Icon from '@mdi/react'
import clsx from 'clsx'

import styles from './CategorySelect.module.scss'

export type Category = {
  name: string
  icon: string
  color: string
  visible: boolean
}

type Props = {
  categories: Category[]
  selectingCategoryIndex: number
  onClick: (index: number) => void
}

export default function CategorySelect({
  categories,
  selectingCategoryIndex,
  onClick,
}: Props) {
  return (
    <div className={clsx(styles.categorySelect)}>
      {categories.map((category, index) => (
        <div
          key={category.name}
          style={{ color: category.color }}
          className={clsx(styles.category, {
            [styles.categorySelecting]: selectingCategoryIndex === index,
          })}
          onClick={() => onClick(index)}
        >
          <Icon path={category.icon} size={1} className={styles.icon} />
          <span className={clsx(styles.name)}>{category.name}</span>
        </div>
      ))}
    </div>
  )
}
