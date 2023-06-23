import { mdiClose } from '@mdi/js'
import Icon from '@mdi/react'

import styles from './SearchBox.module.scss'

type Props = {
  value: string
  onInput: (value: string) => void
}

export default function SearchBox({ value, onInput }: Props) {
  return (
    <div className={styles.searchWrapper}>
      <input
        className={styles.searchBox}
        value={value}
        onInput={(event) => onInput((event.target as HTMLInputElement).value)}
        placeholder="Search movies..."
      />
      {value && (
        <button className={styles.clearButton} onClick={() => onInput('')}>
          <Icon path={mdiClose} size={0.9} />
        </button>
      )}
    </div>
  )
}
