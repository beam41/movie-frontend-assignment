import { useEffect } from 'react'

export function useScrollTopOnEnter() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
}
