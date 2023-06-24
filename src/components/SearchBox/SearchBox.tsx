'use client'
import { mdiClose } from '@mdi/js'
import Icon from '@mdi/react'

import styles from './SearchBox.module.scss'

export default function SearchBox() {
  const value = 1
  return (
    <div className={styles.searchWrapper}>
      <input
        className={styles.searchBox}
        value={value}
        onInput={(_event) => console.log('hi')}
        placeholder="Search Movies..."
      />
      {value && (
        <button
          className={styles.clearButton}
          onClick={() => console.log('hi')}
        >
          <Icon path={mdiClose} size={0.9} />
        </button>
      )}
    </div>
  )
}
