'use client'
import Icon from '@mdi/react'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import styles from './CategoryNavigation.module.scss'

export type Category = {
  name: string
  icon: string
  color: string
  href: string
}

type Props = {
  categories: Category[]
}

export default function CategoryNavigation({ categories }: Props) {
  const pathname = usePathname()

  return (
    <div className={clsx(styles.categorySelect)}>
      {categories.map((category) => (
        <Link
          key={category.name}
          style={{ color: category.color }}
          className={clsx(styles.category, {
            [styles.categoryActive]: pathname === category.href,
          })}
          href={category.href}
        >
          <Icon path={category.icon} size={1} className={styles.icon} />
          <span className={styles.name}>{category.name}</span>
        </Link>
      ))}
    </div>
  )
}
