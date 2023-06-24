'use client'
import { useEffect } from 'react'

import { mdiAlertCircle } from '@mdi/js'

import IconTextJumbotron from '@/components/IconTextJumbotron/IconTextJumbotron'

import styles from './global-error.module.scss'

type Props = {
  error: Error
  reset: () => void
}

export default function GlobalError({ error, reset }: Props) {
  useEffect(() => window.scrollTo(0, 0), [])

  return (
    <div>
      <IconTextJumbotron
        icon={mdiAlertCircle}
        text={`Error occurred (message: ${error.message})`}
      />
      <button onClick={() => reset()} className={styles.tryAgainButton}>
        Try again
      </button>
    </div>
  )
}
