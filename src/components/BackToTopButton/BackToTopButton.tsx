'use client'
import { useEffect, useState } from 'react'

import { mdiArrowUpBold } from '@mdi/js'
import Icon from '@mdi/react'
import clsx from 'clsx'

import styles from './BackToTopButton.module.scss'

type Props = {
  showAfterPx?: number
}

export default function BackToTopButton({ showAfterPx = 100 }: Props) {
  const [show, setShow] = useState(false)

  useEffect(function () {
    const handleScroll = () => {
      setShow(window.scrollY > showAfterPx)
    }

    window.addEventListener('scroll', handleScroll)

    return function cleanupListener() {
      window.removeEventListener('scroll', handleScroll)
    }
  })
  return (
    <button className={clsx(styles.backToTopButton, { [styles.show]: show })}>
      <Icon path={mdiArrowUpBold} size={1} className={styles.icon} />{' '}
      <span className={styles.name} onClick={() => window.scrollTo(0, 0)}>
        Back To Top
      </span>
    </button>
  )
}
