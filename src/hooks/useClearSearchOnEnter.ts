import { useEffect } from 'react'

import { setSearchText } from '@/store/search/searchReducer'
import { useAppDispatch } from '@/store/store'

export function useClearSearchOnEnter() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setSearchText(''))
  }, [])
}
