'use client'
import { mdiAlertCircle } from '@mdi/js'

import IconTextJumbotron from '@/components/IconTextJumbotron/IconTextJumbotron'
import { useScrollTopOnEnter } from '@/hooks/useScrollTopOnEnter'

import styles from './global-error.module.scss'

type Props = {
  error: Error
  reset: () => void
}

export default function GlobalError({ error, reset }: Props) {
  useScrollTopOnEnter()

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
