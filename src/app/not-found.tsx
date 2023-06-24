'use client'
import { mdiAlertCircle } from '@mdi/js'

import IconTextJumbotron from '@/components/IconTextJumbotron/IconTextJumbotron'
import { useScrollTopOnEnter } from '@/hooks/useScrollTopOnEnter'

export default function NotFound() {
  useScrollTopOnEnter()

  return (
    <div>
      <IconTextJumbotron icon={mdiAlertCircle} text={`Page not found`} />
    </div>
  )
}
