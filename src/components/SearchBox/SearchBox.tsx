'use client'
import { FormEvent } from 'react'

import { mdiClose, mdiMagnify } from '@mdi/js'
import Icon from '@mdi/react'
import { useRouter, usePathname } from 'next/navigation'

import { setSearchText } from '@/store/search/searchReducer'
import { useAppDispatch, useAppSelector } from '@/store/store'

import styles from './SearchBox.module.scss'

export default function SearchBox() {
  const router = useRouter()
  const pathname = usePathname()

  const dispatch = useAppDispatch()
  const searchText = useAppSelector((state) => state.search.text)

  const setText = (value: string) => {
    dispatch(setSearchText(value))
    if (pathname === '/search') {
      router.replace(value ? `/search?text=${value}` : '/search')
    } else {
      router.push(value ? `/search?text=${value}` : '/search')
    }
  }

  const onTextInput = (event: FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement
    const value = target.value
    setText(value)
  }

  return (
    <div className={styles.searchWrapper}>
      <input
        className={styles.searchBox}
        value={searchText}
        onInput={onTextInput}
        placeholder="Search Movies..."
      />
      <Icon path={mdiMagnify} size={0.9} className={styles.prependIcon} />
      {searchText && (
        <button className={styles.clearButton} onClick={() => setText('')}>
          <Icon path={mdiClose} size={0.9} />
        </button>
      )}
    </div>
  )
}
