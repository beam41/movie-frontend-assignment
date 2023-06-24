'use client'
import { useEffect } from 'react'

import { mdiAlertCircle } from '@mdi/js'

import IconTextJumbotron from '@/components/IconTextJumbotron/IconTextJumbotron'

export default function NotFound() {
  useEffect(() => window.scrollTo(0, 0), [])

  return (
    <div>
      <IconTextJumbotron icon={mdiAlertCircle} text={`Page not found`} />
    </div>
  )
}
